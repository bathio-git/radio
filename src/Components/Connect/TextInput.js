export default function TextInput(props) {
    
    return (
        <>
            <input
                className="textInput"
                type={props.type}
                placeholder={props.placeholder}
                required
                autoComplete="true"
                onChange={(ev) => props.onChange(ev.target.value)}
            />
            <br />
        </>
    )
}