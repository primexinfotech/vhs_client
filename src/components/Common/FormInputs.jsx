import Select from 'react-select';



export const CustomButton = ({ id, label, onClick, color, size = 'sm', additionalClasses = '', inputrefs }) => {

    const colorClasses = {
        blue: 'bg-[#1F83B7] text-white shadow-lg shadow-[#1F83B7]/20',
        red: 'bg-red-600 text-white shadow-lg shadow-red-200',
    };

    const sizeClasses = {
        sm: 'px-8 py-2 text-sm',
    };

    return (
        <button
            id={id}
            ref={ref => (inputrefs.current[id] = ref)}
            onClick={onClick}
            className={`m-0 flex items-center justify-center rounded-full ${colorClasses[color] || colorClasses.yellow} ${sizeClasses[size]} ${additionalClasses} font-semibold leading-none cursor-pointer`}
        >
            {label}
        </button>
    );
};

export const InputBox = (props) => {
    let { divclassname = '', renderinput = null, key = '', onKeyDown = null, onBlur = null, inputclassname = 'form-control', type = 'text', divstyle = null, inputstyle = null, disabled = false, inputrefs, id, label = '', value, onChange, placeholder, required, showIconTextStart = false, showIconTextEnd = false, startIcon = null, endTextIcon = null } = props
    return (
        <div className={`${divclassname}`}
            style={divstyle}
            key={key}>
            <label className="relative block w-full">
                <span className="text-gray-800 text-[10px] font-medium">{label}</span> {required && <span className='text-red-500 text-[12px]'>*</span>}
                {showIconTextStart && <span className="absolute inset-y-0 left-0 flex items-center pl-3 mt-6 text-gray-500">
                    {startIcon ? startIcon : <i className="fa fa-lock" />}
                </span>}
                <input
                    className={`placeholder:italic placeholder:text-slate-400 placeholder:text-xs block bg-white w-full border border-gray-400 rounded-md py-1 ${startIcon ? 'pl-8' : 'pl-3'} ${endTextIcon ? 'pr-8' : 'pr-3'} focus:outline-none focus:border-sky-200 focus:ring-sky-100 focus:ring-[2px] sm:text-xs`}
                    type={type}
                    id={id}
                    style={inputstyle}
                    onKeyDown={onKeyDown}
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    autoComplete="off"
                />
                {showIconTextEnd && <span className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6 text-gray-500">
                    {endTextIcon ? <span className='text-[12px] font-medium'>{endTextIcon}</span> : <i className="fa fa-user" />}
                </span>}
            </label>
        </div>
    )
}

export const TextAreaBox = (props) => {
    let { divclassname = 'mb-1 ', renderinput = null, key = '', rows = '3', labelclass = 'form-label', onKeyDown = null, onBlur = null, inputclassname = 'form-control', type = 'text', divstyle = null, inputstyle = null, disabled = false, inputrefs, id, label = '', value, onChange, placeholder, required } = props
    return (
        <div
            className={`${divclassname}`}
            style={divstyle}
            key={key}
        >
            {label !== '' ? <label style={{ 'whiteSpace': 'nowrap' }} className='text-gray-800 text-[10px] font-medium' htmlFor={id}>{label}
                {required ? <span style={{ color: "red" }}> *</span> : <></>}
            </label> : <></>}
            <textarea
                id={id}
                style={inputstyle}
                onKeyDown={onKeyDown}
                ref={ref => (inputrefs.current[id] = ref)}
                className={`placeholder:italic placeholder:text-slate-400 placeholder:text-xs block bg-white w-full border border-gray-400 rounded-md py-1 pl-3 pr-3 focus:outline-none focus:border-sky-200 focus:ring-sky-100 focus:ring-[2px] sm:text-xs`}
                rows={rows}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete="off"
                onBlur={onBlur}
                title={required ? 'Please fill this field.' : ''}
                {...props}
            />
            {renderinput}

        </div>
    )
}

export const ReactSelectSearch = (props) => {
    let { divclassname = ' mb-1', key = '', onKeyDown = null, inputrefs, id, label = '', value, options, onChange, placeholder, required } = props

    //-------------- custom Styles --------------//
    const customStyles = {
        control: (base, state) => ({
            ...base,
            height: 26,
            minHeight: 26,
            marginTop: 0,
            paddingTop: 0,
            marginBottom: 0,
            paddingBottom: 0,
            fontSize: '13px',
            paddingLeft: '5px',
            border: '0.1px solid gray',
            backgroundColor: state.isFocused ? 'var(--select_input_focus_bgcolor)' : '',
            color: state.isFocused ? 'var(--light-text)' : ''
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: '0px',
            paddingLeft: '8px',
            color: state.isFocused ? 'var(--light-text)' : ''
        }),
        singleValue: (provided, state) => ({
            ...provided,
            fontSize: '13px',
            color: state.isFocused ? 'var(--light-text)' : ''
        }),
        input: (provided, state) => ({
            ...provided,
            paddingTop: '0px',
            paddingBottom: '0px',
            color: state.isFocused ? 'var(--light-text)' : ''
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '13px'
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            color: state.isFocused ? 'var(--light-text)' : ''
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '22px',
            color: state.isFocused ? 'var(--light-text)' : ''
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: '13px',
            marginTop: 0,
            paddingTop: '1.5px',
            paddingBottom: '1.5px',
            backgroundColor: state.isFocused ? '#5a8dee' : 'var(--select_input_focus_bgcolor)',
            color: state.isFocused ? 'white' : 'var(--light-text)'
        }),
    };

    return (
        <div
            className={divclassname}
            key={key}
        >
            {label !== '' ? <label style={{ 'whiteSpace': 'nowrap' }} className='text-gray-800 text-[10px] font-medium' htmlFor={id}>{label}
                {required ? <span style={{ color: "red" }}> *</span> : <></>}
            </label> : <></>}

            <Select
                id={id}
                onKeyDown={onKeyDown}
                ref={ref => (inputrefs.current[id] = ref)}
                value={value}
                options={options || []}
                onChange={onChange}
                styles={customStyles}
                placeholder={placeholder}
                autoComplete="off"
                {...props}
            />
        </div>
    )
}

export const Switch = (props) => {

    const { id, checked = false, onKeyDown, label, customstyle, onClick,
        extraclassname = `form-check form-switch`,
        onChange, inputrefs } = props

    return (
        <>
            <div className="flex items-end">
                <label className="inline-flex items-center me-5 cursor-pointer">
                    <input
                        type="checkbox"
                        id={id}
                        ref={ref => (inputrefs.current[id] = ref)}
                        checked={checked}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onClick={onClick}
                        value=""
                        class="sr-only peer"
                    />
                    <div className="relative w-10 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4.5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4  after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label ? label : ''}</span>
                </label>
            </div>

        </>
    )
}