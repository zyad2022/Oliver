const fs = require('fs');
const glob = require('glob');

const mapping = {
  cartItems: 'useCart',
  addToCart: 'useCart',
  removeFromCart: 'useCart',
  updateCartQuantity: 'useCart',
  clearCart: 'useCart',
  placeOrder: 'useCart',
  
  activeModal: 'useUI',
  openModal: 'useUI',
  closeModal: 'useUI',
  selectedProduct: 'useUI',
  setSelectedProduct: 'useUI',
  shouldOpenAuth: 'useUI',
  setShouldOpenAuth: 'useUI',
  
  currentUser: 'useAppState',
  isLoggedIn: 'useAppState',
  logout: 'useAppState',
  onNavigate: 'useAppState',
  prevPage: 'useAppState'
};

const files = glob.sync('src/**/*.{ts,tsx}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('useAppContext')) return;

  console.log('Processing', file);

  // find imports
  const importRegex = /import\s+{[^}]*useAppContext[^}]*}\s+from\s+['"]([^'"]+)['"]/;
  const importMatch = content.match(importRegex);
  if (!importMatch) {
    if (file === 'src/components/RedirectToHome.tsx') {
        content = content.replace(/import\s*{\s*useAppContext\s*}\s*from\s*'\.\.\/state';/, '');
        fs.writeFileSync(file, content);
    }
    return;
  }
  const importPath = importMatch[1];

  // find destructuring
  const destructureRegex = /const\s+{([^}]+)}\s*=\s*useAppContext\(\)/g;
  let hooksNeeded = new Set();
  
  content = content.replace(destructureRegex, (match, vars) => {
    const varNames = vars.split(',').map(v => v.trim()).filter(Boolean);
    const assignedVars = {}; // hook -> [vars]
    
    varNames.forEach(v => {
      let coreVar = v;
      if (coreVar.includes(':')) {
        coreVar = coreVar.split(':')[0].trim();
      }
      
      const hookName = mapping[coreVar];
      if (hookName) {
        hooksNeeded.add(hookName);
        if (!assignedVars[hookName]) assignedVars[hookName] = [];
        assignedVars[hookName].push(v);
      } else {
        console.warn(`UNKNOWN VAR ${coreVar} in ${file}`);
      }
    });

    let replacements = [];
    for (const hook in assignedVars) {
      replacements.push(`const { ${assignedVars[hook].join(', ')} } = ${hook}();`);
    }
    return replacements.join('\n  ');
  });

  // Handle direct usages like useAppContext().cartItems
  const directUsageRegex = /useAppContext\(\)\.([A-Za-z0-9_]+)/g;
  content = content.replace(directUsageRegex, (match, prop) => {
    const hookName = mapping[prop];
    if (hookName) {
      hooksNeeded.add(hookName);
      return `${hookName}().${prop}`;
    }
    return match;
  });

  if (hooksNeeded.size > 0) {
    const importStatement = `import { ${Array.from(hooksNeeded).join(', ')} } from '${importPath}';`;
    content = content.replace(importRegex, importStatement);
  } else {
    content = content.replace(importRegex, '');
  }

  fs.writeFileSync(file, content);
});
