import React from 'react'
import Modal from 'react-modal'
import '../../css/dialog.css'
import PropTypes from 'prop-types'

class DialogComp extends React.Component {

    static propTypes = {
        className: PropTypes.string.isRequired,
        text: PropTypes.string,
        submitText: PropTypes.string.isRequired,
        submitFunction: PropTypes.func.isRequired
    }

    state = {
        dialogOpen: false
    }

    closeDialog = () => {
        this.setState({dialogOpen: false})
    }

    openDialog = () => {
        this.setState({dialogOpen: true})
    }

    render() {
        const {dialogOpen} = this.state
        const {children, text, className, submitText, submitFunction} = this.props
        return (
            <div className='dialog-button'>
                <button
                    className={className}
                    onClick={() => {
                        this.openDialog()
                    }}>{text}
                </button>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={dialogOpen}
                    onRequestClose={this.closeDialog}
                    contentLabel='Modal'>
                    <button
                        className='btn-close'
                        onClick={this.closeDialog}/>
                    {children}
                    <button onClick={() => {
                        submitFunction()
                        this.closeDialog()
                    }}>{submitText}</button>
                </Modal>
            </div>
        )
    }
}

export default DialogComp