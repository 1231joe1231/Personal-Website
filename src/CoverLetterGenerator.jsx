import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import AppBar from "./Component/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CoverLetter(props) {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const [file, setFile] = useState(null);

  useEffect(() => generatePDF(), []);

  function makePDF() {
    var doc = {
      content: [
        {
          text: "This is a header (whole paragraph uses the same header style)\n\n",
          style: "header",
        },
        {
          text: [
            "It is however possible to provide an array of texts ",
            "to the paragraph (instead of a single string) and have ",
            { text: "a better ", fontSize: 15, bold: true },
            "control over it. \nEach inline can be ",
            { text: "styled ", fontSize: 20 },
          ],
        },
        {
          text: "independently ",
          margin: [0, -20, 0, 0],
          alignment: "right",
        },
        {
          text: "Mixing named styles and style-overrides",
          style: "header",
          margin: [0, 20, 0, 0],
        },
        {
          style: "bigger",
          italics: false,
          text: [
            'We can also mix named-styles and style-overrides at both paragraph and inline level. For example, this paragraph uses the "bigger" style, which changes fontSize to 15 and sets italics to true. ',
            "Texts are not italics though. It's because we've overriden italics back to false at ",
            "the paragraph level. \n\n",
            "We can also change the style of a single inline. Let's use a named style called header: ",
            { text: "like here.\n", style: "header" },
            "It got bigger and bold.\n\n",
            "OK, now we're going to mix named styles and style-overrides at the inline level. ",
            "We'll use header style (it makes texts bigger and bold), but we'll override ",
            "bold back to false: ",
            { text: "wow! it works!", style: "header", bold: false },
            "\n\nMake sure to take a look into the sources to understand what's going on here.",
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        bigger: {
          fontSize: 15,
          italics: true,
        },
      },
    };
    return doc;
  }

  function generatePDF() {
    const doc = makePDF();
    pdfMake.createPdf(doc).getDataUrl((e) => {
      setFile(e);
    });
  }

  function downloadPDF() {
    const doc = makePDF();
    pdfMake.createPdf(doc).download();
  }

  return (
    <div>
      <AppBar title="Cover Letter Generator" />
      <Box
        style={{
          display: "flex",
          flexDirection: desktop ? "row" : "column",
          padding: "20px",
        }}
      >
        <Box
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={generatePDF}
            style={{ marginRight: 20 }}
          >
            Generate PDF
          </Button>
          <Button variant="contained" color="primary" onClick={downloadPDF}>
            Download PDF
          </Button>
        </Box>
        <Box
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: desktop ? 0 : 20,
          }}
        >
          <iframe
            title="PDF preview"
            src={file}
            style={{ height: desktop ? "90vh" : "70vh", width: desktop ? "45vw" : "90vw" }}
          ></iframe>
        </Box>
      </Box>
    </div>
  );
}
export default CoverLetter;
