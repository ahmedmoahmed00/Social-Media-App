export default function PasswordStrength({ showProgress, password, rules }) {
  const passed = rules?.filter((rule) => rule?.test(password)).length;
  const rawStrength = (passed / rules?.length) * 100;

  const strength = password.length > 0 ? Math.max(rawStrength, 10) : 0;

  return (
    <div className="w-full space-y-2">
      {showProgress && (
        <div>
          <span className="text-gray-500 text-xs">Password strength:</span>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`
              h-full transition-all duration-300
              ${
                rawStrength === 0
                  ? "bg-red-500"
                  : strength < 50
                  ? "bg-red-500"
                  : strength < 75
                  ? "bg-yellow-400"
                  : "bg-green-500"
              }
            `}
              style={{ width: `${strength}%` }}
            ></div>
          </div>
        </div>
      )}

      <div>
        <span
          className={` text-gray-500  ${showProgress ? "text-md" : "text-xs"}`}
        >
          Password must contain:
        </span>
        <ul className="space-y-1 text-xs ml-5">
          {rules.map((rule, i) => (
            <li
              key={i}
              className={` list-disc  ${
                rule.test(password) ? "text-green-600" : "text-gray-500"
              }`}
            >
              {rule.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
