const Loading = ({color}: {color: string}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={`block w-full h-full stroke-current ${color}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="36"
        strokeWidth="3"
        strokeDasharray="50.26548245743669 50.26548245743669"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1.3333333333333333s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="30"
        strokeWidth="3"
        strokeDasharray="47.12388980384689 47.12388980384689"
        strokeDashoffset="47.12388980384689"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1.3333333333333333s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;-360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default Loading;
