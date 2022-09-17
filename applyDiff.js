/**
 * DOM 노드 비교
 * @param {Element} node1
 * @param {Element} node2
 */
const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;

  //* 속성 개수 비교
  if (n1Attributes.length !== n2Attributes.length) return true;

  //* 속성 값 비교
  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;

    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentAttribute) return true;

  //* textContent 비교
  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

/**
 *
 * @param {Element} parentNode
 * @param {Element} realNode
 * @param {Element} virtualNode
 */
const applyDiff = (parentNode, realNode, virtualNode) => {
  //* 노드 삭제 시
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  //* 노드 추가 시
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  //* 노드 변경 시
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  //* 자식 노드 비교
  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
