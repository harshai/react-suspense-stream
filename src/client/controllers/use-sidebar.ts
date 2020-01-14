import { useState } from 'react';

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const collapse = () => {
    setIsCollapsed(true);
  };

  const expand = () => {
    setIsCollapsed(false);
  };

  return {
    collapse,
    expand,
    isCollapsed,
    // onCollapse,
    // onExpand,
  };
};