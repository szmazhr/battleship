const DOM = {
  createElement(properties) {
    const { tagName, className, id, innerHTML, attributes, text, children } =
      properties;
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (id) element.id = id;
    if (children) {
      element.append(...children);
    } else if (text) {
      element.textContent = text;
    } else if (innerHTML) {
      element.innerHTML = innerHTML;
    }
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
      });
    }
    return element;
  },
};

export default DOM;
