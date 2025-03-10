interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="text-center text-3xl p-20">
      <span>⛔</span> {message}
    </p>
  );
};

export default ErrorMessage;
