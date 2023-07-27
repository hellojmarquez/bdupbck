export default ({ type, label, placeholder, fieldref, hasError }) => {
  const classes = "h-10 border rounded-lg px-3 py-2 mt-1 text-neutral-950 text-sm w-full focus:none"

  return (
    <div className="form-group">
      <label className="font-nunitosans font-bold text-base text-[#2f2f2f] pb-1 block mt-5">{label}</label>
      {type === "textarea" ? (
        <textarea className={classes} cols="3" placeholder={placeholder} {...fieldref} ></textarea>
      ) : (
        <input className={classes} type={type} placeholder={placeholder} {...fieldref} />
      )}
      {hasError && <p className="w-full mt-2 py-1 rounded-lg text-center bg-red-300 text-red-900">{`${label} es requerido`}</p>}
    </div>
  )
}

