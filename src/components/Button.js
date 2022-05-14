import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {
    return (
    <button onClick={onClick} 
    style={{backgroundColor: color,
        cursor:'pointer',
        fontSize: 20,
        borderRadius: 15,
        padding: 10,
        margin: 10,
        borderWidth: 5
    }} 
    className='btn'>{text}</button>)
}

Button.defaultProps = {
    color: 'steelble'
}

Button.prototype = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}
export default Button