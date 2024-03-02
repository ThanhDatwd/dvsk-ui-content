export const CloseIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.293 16.293a1 1 0 101.414 1.414L.293 16.293zm11.414-8.586L12.414 7 11 5.586l-.707.707 1.414 1.414zm-10 10l10-10-1.414-1.414-10 10 1.414 1.414zM16.293 17.707a1 1 0 001.414-1.414l-1.414 1.414zm-4.586-7.414L11 9.586 9.586 11l.707.707 1.414-1.414zm6 6l-6-6-1.414 1.414 6 6 1.414-1.414z"
        fill={color || "#000"}
      />
      <path
        d="M7.1 7.1L7 7"
        stroke={color || "#000"}
        strokeWidth={2}
        strokeLinecap="square"
      />
      <path
        d="M11 2v3l2 2h3l2-7-7 2zM7 2v3L5 7H2L0 0l7 2z"
        fill={color || "#000"}
      />
    </svg>
  );
};
