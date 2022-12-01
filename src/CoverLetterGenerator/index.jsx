import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import AppBar from "../Component/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../Asset/vfs_fonts";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import * as paragraphs from "../Asset/paragraph.json";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "times new roman.ttf",
    bold: "times new roman bold.ttf",
    italics: "times new roman italic.ttf",
    bolditalics: "times new roman bold italic.ttf",
  },
};

function CoverLetter(props) {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const [file, setFile] = useState(null);
  const [FullName, setFullName] = useState("");
  const [ShortName, setShortName] = useState("");
  const [Employer, setEmployer] = useState("");
  const [Title, setTitle] = useState("");
  const [Anchor, setAnchor] = useState("inspired me to apply for this position.");
  const [Address, setAddress] = useState("");
  const [BodyPara1, setBodyPara1] = useState(1);
  const [BodyPara2, setBodyPara2] = useState(1);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => generatePDF(), []);

  function handleInput(event) {
    switch (event.target.name) {
      case "FullName":
        setFullName(event.target.value);
        break;
      case "ShortName":
        setShortName(event.target.value);
        break;
      case "Employer":
        setEmployer(event.target.value);
        break;
      case "Title":
        setTitle(event.target.value);
        break;
      case "Address":
        setAddress(event.target.value);
        break;
      case "Anchor":
        setAnchor(event.target.value);
        break;
      case "BodyPara1":
        setBodyPara1(event.target.value);
        break;
      case "BodyPara2":
        setBodyPara2(event.target.value);
        break;
      default:
        console.log("Invalid input name");
        break;
    }
  }

  function getDate() {
    var today = new Date();
    return (
      monthNames[today.getMonth()] +
      " " +
      today.getDate() +
      ", " +
      today.getFullYear()
    );
  }

  function makePDF() {
    var doc = {
      defaultStyle: {
        font: "TimesNewRoman",
        fontSize: 12,
        lineHeight: 1.4,
      },
      content: [
        {
          text: [
            { text: "Ruixin(Joe) Zhuang\n", fontSize: 24 },
            "647-469-8666 • joe.zhuang@mail.utoronto.ca\n",
            "linkedin.com/in/ruixin-zhuang • github.com/1231joe1231",
          ],
          alignment: "center",
        },
        {
          text: FullName,
          margin: [0, 15, 0, 0],
        },
        {
          text: getDate(),
          margin: [0, -18, 0, 0],
          alignment: "right",
        },
        {
          text: [Employer, "\n", Title, "\n", Address],
        },
        {
          text: ["Dear ", ShortName, ","],
          margin: [0, 15, 0, 0],
        },
        {
          text: [
            "I would like to apply for the ",
            Title,
            " position at ",
            Employer,
            ". I am currently a fourth year student at University of Toronto Scarborough, ",
            "and I am specialized in Computer Science Co-op. ",
            // "Among all of my past experience including pursuing my degree on campus, ",
            // "working at start-up company, collaborating on off-campus projects and being an software developer at PwC Shanghai AC, ",
            // "I would conclude myself to be a fast learner, tech-savvy developer as well as a diligent student.",
            Anchor,
            " With ",
            paragraphs.body_para[BodyPara1].intro_sentence,
            " and ",
            paragraphs.body_para[BodyPara2].intro_sentence,
            ", I believe I can make meaningful contributions to your company.",
          ],
        },
        {
          text: paragraphs.body_para[BodyPara1].content,
          margin: [0, 15, 0, 0],
        },
        {
          text: paragraphs.body_para[BodyPara2].content,
          margin: [0, 15, 0, 0],
        },
        {
          text: [
            "In conclusion, ",
            paragraphs.body_para[BodyPara1].conclusion_sentence,
            ", while ",
            paragraphs.body_para[BodyPara2].conclusion_sentence,
            ". The accumulation of all of my skills will make me a good fit for the ",
            Title,
            " in your company. I sincerely look forward to receiving your reply and hopefully meeting you in the interview. Thank you.",
          ],
          margin: [0, 15, 0, 0],
        },
        {
          text: "Respectfully yours,\nRuixin Zhuang",
          margin: [0, 15, 0, 0],
        },
      ],
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
    pdfMake.createPdf(doc).download(Employer + ' ' + Title + '.pdf');
  }

  return (
    <div key="1">
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">Intro Paragraph</Typography>
          <Box
            key="Basic Info Box"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: "20px",
              width: "65%",
            }}
          >
            <TextField
              name="FullName"
              key="FullName"
              label="Full Name of Contact"
              value={FullName}
              onChange={handleInput}
              inputProps={{
                autoComplete: "nope",
                form: {
                  autoComplete: "off",
                },
              }}
            />
            <TextField
              name="ShortName"
              key="ShortName"
              label="Short Name of Contact"
              value={ShortName}
              onChange={handleInput}
              inputProps={{
                autoComplete: "nope",
                form: {
                  autoComplete: "off",
                },
              }}
            />
            <TextField
              name="Employer"
              key="Employer"
              label="Company Name"
              value={Employer}
              onChange={handleInput}
              inputProps={{
                autoComplete: "nope",
                form: {
                  autoComplete: "off",
                },
              }}
              style={{ marginTop: "20px" }}
            />
            <TextField
              name="Title"
              key="Title"
              label="Job Title"
              value={Title}
              onChange={handleInput}
              inputProps={{
                autoComplete: "nope",
                form: {
                  autoComplete: "off",
                },
              }}
              style={{ marginTop: "20px" }}
            />
            <TextField
              fullWidth
              name="Address"
              key="Address"
              label="Company Address"
              value={Address}
              onChange={handleInput}
              inputProps={{
                autoComplete: "nope",
                form: {
                  autoComplete: "off",
                },
              }}
              style={{ marginTop: "20px" }}
            />
            <TextField
              fullWidth
              multiline
              name="Anchor"
              key="Anchor"
              label="Anchor Sentence"
              value={Anchor}
              onChange={handleInput}
              inputProps={{
                autoComplete: "nope",
                form: {
                  autoComplete: "off",
                },
              }}
              style={{ marginTop: "20px" }}
            />
          </Box>
          <Typography variant="h4" style={{ marginTop: "50px" }}>
            Body Paragraph
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
            <FormControl style={{ minWidth: 300 }}>
              <InputLabel id="body_para_1">Body Paragraph 1</InputLabel>
              <Select
                labelId="body_para_1"
                id="body_para_1"
                name="BodyPara1"
                value={BodyPara1}
                onChange={handleInput}
              >
                {paragraphs.body_para.map((item, key) => {
                  return key === 0 ? null : (
                    <MenuItem value={key}>{item.description}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl style={{ minWidth: 300 }}>
              <InputLabel id="body_para_2">Body Paragraph 2</InputLabel>
              <Select
                labelId="body_para_2"
                id="body_para_2"
                name="BodyPara2"
                value={BodyPara2}
                onChange={handleInput}
              >
                {paragraphs.body_para.map((item, key) => {
                  return key === 0 ? null : (
                    <MenuItem value={key}>{item.description}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
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
            style={{
              height: desktop ? "90vh" : "70vh",
              width: desktop ? "45vw" : "90vw",
            }}
          ></iframe>
        </Box>
      </Box>
    </div>
  );
}
export default CoverLetter;
