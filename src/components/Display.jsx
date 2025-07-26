const NUMBER_FORMAT = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
})

const formatOperand = (operand) => {
    if (operand === "") return "";
    const [ integer, decimal ] = operand.split(".");
    if (decimal === undefined) return NUMBER_FORMAT.format(Number(integer));
    return `${NUMBER_FORMAT.format(Number(integer))}.${decimal}`;
}

const Display = ({ value, result }) => {
    return (
        <div className="bg-[rgba(255,255,255,.55)] w-full h-20 mb-6 p-2 rounded-2xl flex flex-col items-end justify-end">
            <div className="text-3xl font-semibold line-clamp-1">
                {value}
            </div>
            <div className="text-[rgba(0,0,0,.8)] line-clamp-1 pr-1">
                {result !== "" ? `= ${formatOperand(result)}` : " "}
            </div>
        </div>
    )
}

export default Display;