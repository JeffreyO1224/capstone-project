export default function RoundedRectangle(props) {
    const style = {
        width: props.width,
        height: props.height,
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
    }

    return (
        <div style={style}>
            <h1 className='loginText'>Login</h1>
        </div>
    )
}