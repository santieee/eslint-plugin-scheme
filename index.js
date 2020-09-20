const requiredProperties = ['is', 'vModel', 'type', 'cols'];



const create = (context) => {
  const getProperties = (element) => element.properties.map(property => property.key.name);
  
  const validateProperties = (element) => {
    const missedProperties = [];
    const elProperties = getProperties(element);
    requiredProperties.forEach(requiredProperty => {
      if(!elProperties.includes(requiredProperty)){
        missedProperties.push(requiredProperty)
      }
    });
    if(!missedProperties.length) return;
    context.report(element, `Element hasn\`t required properties [${missedProperties.join(', ')}]`);
  }
  
  const validateElement = (element) => {
    validateProperties(element);
  };

  return {
    ObjectExpression(node) {
      const elementsAST = node.properties.find(properties => properties.key.name === 'elements');
      if(!elementsAST) return;
      const elements = elementsAST.value.elements;

      elements.forEach(validateElement);
    }
  };
};




module.exports = {
  rules: {
    "required-props": {
      create,
    }
  }
};