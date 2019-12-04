import React, { Component } from "react";
import { render } from "react-dom";
import ReactMarkdown from "react-markdown";
import JsxParser from "react-jsx-parser";
import PieChartOrig from "react-minimal-pie-chart";
import styled from "styled-components";
import yaml from "js-yaml";
import "./index.css";
/* import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript"; */

//import SynHi from "./SynHi";

// this is just plain text
import AppMarkdown from "./test-markdown.md";

var remark = require("remark");

// constrain pie, so it doesn't fill page
const PieChart = styled(PieChartOrig)`
  width: 100px;
  height: 100px;
`;

// these are the components you want to expose to your jsx-in-markdown:
const components = {
  PieChart
};

/* function stringSourcePos(sourcePos) {
  sourcePos.map(position => {
    return `${position.start.line} : ${position.start.column} - ${position.end.line} : ${position.end.column}`;
  });
} */

/* const SourcePos = sourcePosition.map(position => {
  return `${position.start.line} : ${position.start.column} - ${position.end.line} : ${position.end.column}`;
});
 */

const renderers = {
  paragraph: ({ sourcePosition, value, text, children, index }) => {
    const stringPos = `${sourcePosition.start.line}:${sourcePosition.start.column}-${sourcePosition.end.line}:${sourcePosition.end.column}`;

    return (
      <p data-sourcepos={stringPos} data-index={index}>
        {children}
      </p>
    );
  },
  code: ({ language, value, sourcePosition, index }) => {
    const stringPos = `${sourcePosition.start.line}:${sourcePosition.start.column}-${sourcePosition.end.line}:${sourcePosition.end.column}`;
    // render "jsx" type as self-contained JSX (with only above components exposed)
    if (language === "jsx") {
      return (
        <div data-sourcepos={stringPos} data-index={index}>
          <JsxParser jsx={value} components={components} />
        </div>
      );
    }

    // render "pie" type as YAML and hand it to a pie
    if (language === "pie") {
      return (
        <div data-sourcepos={stringPos} data-index={index}>
          <PieChart data={yaml.safeLoad(value)} key={stringPos} />
        </div>
      );
    }
    if (language === "md") {
      return (
        <div data-index={index} data-sourcepos={stringPos}>
          {value}
        </div>
      );
    }
    /*     sourcePosition.map(position => {
      return `${position.start.line} : ${position.start.column} - ${position.end.line} : ${position.end.column}`;
    }); */

    /*     if (sourcePosition ) */
    // try to syntax-highlight, using my custom style
    /*   return <SynHi language={language}>{value}</SynHi>; */
    return (
      <pre data-sourcepos={stringPos} data-index={index}>
        <code> {value}</code>
      </pre>
    );
  }
};

/* const App = () => <ReactMarkdown source={text} renderers={renderers} />;
 */

/* class Editor extends Component {
  render() {
    return this.props.markdown.map(node => {
      return (
  

            )
    )
  }
} */
class Editor extends Component {
  render() {
    return this.props.markdown.map((node, index) => {
      return (
        <div id={`ta-${index}`} key={index}>
          <textarea
            data-key={index}
            className="editor"
            value={node}
            onChange={e => this.props.onChange(e)}
            onClick={e => console.log(e)}
            type="text"
          />
        </div>
      );
    });
  }
}

class Preview extends Component {
  constructor(props) {
    super(props);
    let ArrEditor = Array(this.props.markdown.length).fill(true);
    this.state = {
      showEditor: ArrEditor
    };
    console.log(this.state.showEditor);
  }

  /*   componentDidMount() {
    setTimeout(() => {
      let ArrEditor = Array(this.props.markdown.length).fill(true);
      this.state = {
        showEditor: ArrEditor
      };
      console.log(this.state.showEditor);
    }, 500);
  } */
  /* 
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(
        ([key, val]) =>
          prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
  } */

  /*   handleEditorClick(e) {
    //console.log(e);
    let markdownEditorID = this.state.showEditor;
    let key = e.currentTarget.getAttribute("data-index");
    //console.log(markdownEditorID);
    markdownEditorID[key] = !this.state.showEditor[key];
    this.setState({
      showEditor: markdownEditorID
    });
  } */

  render() {
    //console.log(Array(this.props.markdown.length).fill(false));

    return this.props.markdown.map((node, index) => {
      return (
        <div>
          <div className="markdown-node-container">
            <div
              className="edit-box"
              onClick={e => this.handleEditorClick(e)}
              // onClick={
              //   e =>
              //     console.log(
              //       e.currentTarget.parentElement.parentElement.getAttribute(
              //         "data-index"
              //       )
              //     )
              //   //console.log(e.currentTarget.nextElementSibling.innerHTML)
              // }
              //onClick={e => }
            ></div>
          </div>
          <div
            id={`md-${index}`}
            key={index}
            data-index={index}
            onDoubleClick={e => this.handleEditorClick(e)}
          >
            <ReactMarkdown
              source={node}
              sourcePos={true}
              rawSourcePos={true}
              includeNodeIndex={true}
              renderers={renderers}
            />
            <textarea
              data-key={index}
              className="editor"
              value={node}
              onChange={e => this.handleChange(e)}
              onClick={e => console.log(e)}
              type="text"
            />
            {this.state.showEditor[index] && (
              <textarea
                data-key={index}
                className="editor"
                value={node}
                onChange={e => this.onChange(e)}
                onClick={e => console.log(e)}
                type="text"
              />
            )}
          </div>
        </div>
      );
    });
  }
}

/* function Preview() {



  return this.props.markdown.map((node, index) => {
    return (
      <div
        id={`md-${index}`}
        key={index}
        data-index={index}
        onClick={() => setshowEditor(!showEditor)}
      >
        <ReactMarkdown
          source={node}
          sourcePos={true}
          rawSourcePos={true}
          includeNodeIndex={true}
          renderers={renderers}
        />

        {showEditor && (
          <textarea
            data-key={index}
            className="editor"
            value={node}
            onChange={e => this.props.onChange(e)}
            onClick={e => console.log(e)}
            type="text"
          />
        )}
      </div>
    );
  });
};
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { markdown: [], clickHandeler: "", showEditor: [false] };
    console.log(this.state.showEditor);
  }

  handleChange(e) {
    let markdownID = [...this.state.markdown];
    let key = e.target.getAttribute("data-key");
    markdownID[key] = e.target.value;
    console.log(markdownID);
    this.setState({
      markdown: markdownID
      // onDoubleClick
      // event.currentTarget.getAttribute('data-sourcepos')
    });
  }

  handleEditorClick(e) {
    //console.log(e);
    let markdownEditorID = this.state.showEditor;
    let key = e.currentTarget.getAttribute("data-index");
    //console.log(markdownEditorID);
    markdownEditorID[key] = !this.state.showEditor[key];
    this.setState({
      showEditor: markdownEditorID
    });
  }

  handleClick(e) {
    console.log(e);
    /*     this.setState({
      clickHandeler: e.currentTarget.getAttribute("data-sourcepos")
      * onDoubleClick
      * event.currentTarget.getAttribute('data-sourcepos')
    }); */
  }
  /*   handleClick(e) {

  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value,
      lastClicked: '',
    });
 */
  /*   componentDidUpdate(prevstate) {
    * Typical usage (don't forget to compare props):
    if (this.state.markdown !== prevstate.markdown) {
      console.log("they're not equal!");
    }
  }
 */
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(
        ([key, val]) =>
          prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
  }

  componentWillMount() {
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    fetch(AppMarkdown)
      .then(res => res.text())
      .then(text => remark.parse(text))
      .then(text => {
        var x = [];
        for (var node of text.children) {
          //x += node;
          x.push(remark.stringify(node));
        }
        return x;
      })
      // .then(text => )
      //.then(text => console.log(text.children))
      // .then(text => this.setState({ markdown: text }));
      .then(x => this.setState({ markdown: x }));

    let ArrEditor = Array(this.state.markdown.length).fill(false);

    this.setState({ ArrEditor: ArrEditor });
    // console.log(tree);
  }

  render() {
    const { markdown } = this.state;
    return (
      <div>
        {/*    <div className="aside">Something here</div>
               <div className="aside">
          <Editor
            markdown={markdown}
            onChange={e => this.handleChange(e)}
            //onClick={e => this.handleClick(e)}
          />
        </div> */}
        <div className="aside">
          {this.state.markdown.map((node, index) => {
            return (
              <div className="markdown-node-container">
                <div
                  className="edit-box"
                  data-index={index}
                  onClick={e => this.handleEditorClick(e)}
                  // onClick={
                  //   e =>
                  //     console.log(
                  //       e.currentTarget.parentElement.parentElement.getAttribute(
                  //         "data-index"
                  //       )
                  //     )
                  //   //console.log(e.currentTarget.nextElementSibling.innerHTML)
                  // }
                  //onClick={e => }
                ></div>
                <div
                  id={`md-${index}`}
                  key={index}
                  data-index={index}
                  onDoubleClick={e => this.handleEditorClick(e)}
                >
                  <ReactMarkdown
                    source={node}
                    sourcePos={true}
                    rawSourcePos={true}
                    includeNodeIndex={true}
                    renderers={renderers}
                  />
                  {this.state.showEditor[index] && (
                    <textarea
                      data-key={index}
                      className="editor"
                      value={node}
                      onChange={e => this.handleChange(e)}
                      onClick={e => console.log(e)}
                      type="text"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
