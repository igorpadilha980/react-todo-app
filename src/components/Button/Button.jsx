import buttonStyle from './Button.module.css'

function Button({ className, action, round, children, ...style }) {
    className = buttonStyle.button + ' ' + (round? buttonStyle.round : '') + (className ?? '')

    return (
        <button 
            className={className}
            onClick={action}
            style={style}
        >
            {children}
        </button>
    )
}

export default Button