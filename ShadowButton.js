import React from "react";
import ReactDOM from 'react-dom';


export default class ShadowButton extends React.Component {
    constructor(props) {
        super(props);

        this.setClickStyle = this.setClickStyle.bind(this);

        this.state = {
            posLeft: null,
            posTop: null,
        };

        this.class_ = this.props.class;
        this.buttonClass = "s-button-" + this.class_;
        this.text = this.props.text;

        this.customStyles = {
            width: this.props.styles.width || "200px",
            height: this.props.styles.height || "140px",
            color: this.props.styles.color || "rgb(94, 91, 245)",
            borderWidthAsInt: this.stringStyleToInt(this.props.styles.borderWidth || "6px"),
            borderRadius: this.props.styles.borderRadius || "10px",
            fontFamily: this.props.styles.fontFamily || "Arial",
            fontSize: this.props.styles.fontSize || "14px",
            opacity: this.props.styles.opacity || ".125",
            zIndex: this.props.styles.zIndex || 1
        }

        this.buttonStyles = {
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0)",
            outline: "none",
            border: `solid ${this.customStyles.borderWidthAsInt}px ${this.customStyles.color}`,
            borderRadius: this.customStyles.borderRadius,
            color: this.customStyles.color,
            width: this.customStyles.width,
            height: this.customStyles.height,
            fontFamily: this.customStyles.fontFamily,
            fontSize: this.customStyles.fontSize,
            zIndex: this.customStyles.zIndex + 1,
            transition: "all .035s ease-out",
        };

        this.shadowStyles = {
            position: "absolute",
            backgroundColor: `rgba(0, 0, 0, ${this.customStyles.opacity})`,
            borderRadius: this.customStyles.borderRadius,
            left: (this.state.posLeft + 2 * this.customStyles.borderWidthAsInt) + "px",
            top: (this.state.posTop + 2 * this.customStyles.borderWidthAsInt) + "px",
            width: (this.stringStyleToInt(this.customStyles.width) - this.customStyles.borderWidthAsInt / 2) + "px",
            height: (this.stringStyleToInt(this.customStyles.height) - this.customStyles.borderWidthAsInt / 2) + "px",
            zIndex: this.customStyles.zIndex,
            transition: "all .035s ease-out"
        }
    }

    componentDidMount() {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({posLeft: rect.left, posTop: rect.top});
    }

    stringStyleToInt(style) {
        return parseInt(style.split("px")[0]);
    }

    setClickStyle(mouseIsDown) {
        let button = document.getElementsByClassName(this.buttonClass)[0];
        button.style.marginLeft = mouseIsDown ? 2 * this.customStyles.borderWidthAsInt + "px" : "0px";
        button.style.marginTop = mouseIsDown ? 2 * this.customStyles.borderWidthAsInt + "px" : "0px";

        this.props.onClickFunction();
    }

    render() {
        return (
            <div className={this.class_}>
                <button className={this.buttonClass} style={this.buttonStyles} onMouseDown={() => this.setClickStyle(true)} onMouseUp={() => this.setClickStyle(false)}>
                    <b>{this.text}</b>
                </button>

                <div className="s-shadow" style={this.shadowStyles}></div>
            </div>
        )
    }
}