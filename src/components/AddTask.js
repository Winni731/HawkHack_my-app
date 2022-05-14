import { useState } from 'react'
import Form from 'react-bootstrap/Form'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please add a task')
            return
        }

        onAdd({text, day, reminder})

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit} >
            <Form>
            <Form.Group className='form-control'
            placeholder = 'Start your Stories...'>
                <Form.Label style={{
                                textAlign: 'top'
                              }}></Form.Label>
                <Form.Control as='textarea'
                style={{
                                height: 220,
                                width: 500,
                                margin: 0,
                              }}
                rows={10}
                value={text} onChange={ (e)=>setText(e.target.value)} />
                </Form.Group>
            </Form>
            <div className='form-control'>
                <label>Day and Time</label>
                <input type='text' disabled
                style={{ width: 400}}
                value={Date().toLocaleString()} onChange={ (e)=>setDay(e.target.value)}/>
            </div>
            <div className='form-control
            form-control-check'>
                <label>Important-Tag</label>
                <input type='checkbox' 
                checked={reminder}
                value={reminder} onChange={ (e)=>setReminder(e.currentTarget.checked)}/>
            </div>

            <input type='submit' value='Save Story' 
            className='btn btn-block' />
        </form>
    )
}

export default AddTask