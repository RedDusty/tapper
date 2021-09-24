function Connection({ latency }: { latency: number | '?' | 'Offline' | 'Reconnect' }) {
  let color = 'text-gray-700';
  if (typeof latency === 'number') {
    if (latency < 500) {
      color = 'text-green-500';
    } else if (latency >= 500 && latency < 1000) {
      color = 'text-yellow-600';
    } else {
      color = 'text-red-700';
    }
  } else if (latency === 'Offline') {
    color = 'text-blue-500';
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`fill-current ${color}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M6.043 19.496l-1.482 1.505c-2.791-2.201-4.561-5.413-4.561-9.001s1.77-6.8 4.561-9l1.482 1.504c-2.326 1.835-3.804 4.512-3.804 7.496s1.478 5.661 3.804 7.496zm.675-7.496c0-1.791.887-3.397 2.282-4.498l-1.481-1.502c-1.86 1.467-3.04 3.608-3.04 6s1.18 4.533 3.04 6l1.481-1.502c-1.396-1.101-2.282-2.707-2.282-4.498zm15.043 0c0-2.984-1.478-5.661-3.804-7.496l1.482-1.504c2.791 2.2 4.561 5.412 4.561 9s-1.77 6.8-4.561 9.001l-1.482-1.505c2.326-1.835 3.804-4.512 3.804-7.496zm-6.761 4.498l1.481 1.502c1.86-1.467 3.04-3.608 3.04-6s-1.18-4.533-3.04-6l-1.481 1.502c1.396 1.101 2.282 2.707 2.282 4.498s-.886 3.397-2.282 4.498zm-3-7.498c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3z" />
    </svg>
  );
}

export default Connection;
