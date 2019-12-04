import React, { Component } from "react";
import { render } from "react-dom";
import ReactMarkdown from "react-markdown";
import text from "./test-markdown.md";
import JsxParser from "react-jsx-parser";
import PieChartOrig from "react-minimal-pie-chart";
import styled from "styled-components";
import yaml from "js-yaml";

import qa from "./question.jsx";
import logo from "./logo.svg";
import "./App.css";

// constrain pie, so it doesn't fill page
const PieChart = styled(PieChartOrig)`
  width: 100px;
  height: 100px;
`;

// these are the components you want to expose to your jsx-in-markdown:
const components = {
  PieChart
};
const input = "# This is a header\n\nAnd this is a paragraph";

const renderers = {
  code: ({ language, value }) => {
    // render "jsx" type as self-contained JSX (with only above components exposed)
    /*     if (language === "jsx") {
      return <JsxParser jsx={value} components={components} />;
    } */

    // render "pie" type as YAML and hand it to a pie
    /*     if (language === "pie") {
      return <PieChart data={yaml.safeLoad(value)} />;
    } */

    /*     if (language === "emoji") {
      return { value };
    } */
    // render "pie" type as YAML and hand it to a pie
    if (language === "pie") {
      return <PieChart data={yaml.safeLoad(value)} />;
    }
  }
};
const App = () => <ReactMarkdown source={text} renderers={renderers} />;
render(<App />, document.getElementById("root"));

//export default App;
