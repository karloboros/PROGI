import { h } from 'vue';
import { NButton } from 'naive-ui';

const createButton = ({ type, onClick, label }) => {
  return h(
    NButton,
    {
      secondary: true,
      type,
      size: 'small',
      onClick,
    },
    { default: () => label },
  );
};

export { createButton };
