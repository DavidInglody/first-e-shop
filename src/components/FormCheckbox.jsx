const FormCheckbox = ({label,name,defaultValue,size}) => {
  return (
    <div className="form-control items-center">
        <label className="label cursor-pointer" htmlFor={name}>
            <span className="label-text capitalize">{label}</span>
        </label>
            <input type="checkbox" name={name} defaultChecked={defaultValue} className={`checkbox checkbox-primary ${size}`} />
    </div>
  )
}
export default FormCheckbox