import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import en_flag from "../../assets/home/us_flag.png";
import uk_flag from "../../assets/home/uk_flag.png";
export default function SelectLanguage() {
  const [lang, setLang] = React.useState("us");

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" width="20px">
        <Select
          value={lang}
          onChange={handleChange}
          label="Language"
          disableUnderline
          fullWidth
          className="!text-white !text-sm !sm:text-base"
        >
          <MenuItem value={"us"}>
            <img
              src={en_flag}
              alt="US Flag"
              className="object-cover w-6 mr-1 mb-1 inline-block"
            />
            English (US)
          </MenuItem>
          <MenuItem value={"uk"}>
            <img
              src={uk_flag}
              alt="UK Flag"
              className="object-cover w-6 mr-1 mb-1 inline-block"
            />
            English (UK)
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
