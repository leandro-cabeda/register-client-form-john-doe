import { useState } from "react";
import "./App.css";
import * as Component from "react-bootstrap";
import {
  Button,
  Col,
  Alert,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as yup from "yup";
import { IMaskInput } from "react-imask";
import InputColor from "react-input-color";
import Service from "./services/Index";

const App = () => {
  const service = new Service();
  const { Group, Label, Control } = Component.Form;

  const valuesForm = {
    email: "",
    observation: "",
    name: "",
    color: "",
    cpf: "",
  };
  const [initialValues, setInitialValues] = useState(valuesForm);
  const [hasCpf, setHasCpf] = useState("");
  const [focusCpf, setFocusCpf] = useState(true);
  const [cor, setCor] = useState("");
  const [obs, setObs] = useState("");
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");

  const schema = yup.object().shape({
    name: yup.string().min(3, "Nome curto!").max(30, "Nome longo!").required(),
    color: yup.string().required(),
    email: yup.string().email("Invalid email").required(),
    cpf: yup.string().required(),
    observation: yup.string(),
  });

  const validField = (error: any, valueField: string) => {
    let valid = true;

    Object.keys(error).forEach((key) => {
      if (error[key] === valueField) {
        valid = false;
      }
    });

    return valid;
  };

  const validFormFields = (error: any, fieldError: any, touched: any) => {
    if (
      (Object.keys(error).length && !validField(error, fieldError)) ||
      (!Object.keys(error).length && !Object.keys(touched).length)
    ) {
      return false;
    }

    return true;
  };

  const wait = (secs: any) => {
    return new Promise((resolve) => setTimeout(resolve, secs * 1000));
  };

  const alertToast = () => {
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative"
        style={{
          minHeight: "240px",
          minBlockSize: "min-content",
          display: "contents",
        }}
      >
        <ToastContainer position="top-end" className="p-3">
          <Toast show={alert} onClose={() => setAlert(false)}>
            <Toast.Header>
              <strong className="me-auto">Alerta!!</strong>
            </Toast.Header>
            <Toast.Body>
              <div className={`alert alert-${typeMessage}`} role="alert">
                {alertMessage}
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
  };

  const actionsFinally = () => {
    setLoading(true);
    setHidden(false);
    setAlert(false);
    setTypeMessage("");
    setAlertMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        {alertToast()}
        <h1>
          <b>Formulário de Cadastro de Cliente</b>
        </h1>
      </header>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {

          try {
            const res = await service.createClient(values);
            console.log("res: ", res);

            resetForm();
            setHasCpf("");
            setObs("");
            setSubmitting(false);
            setAlert(true);
            setTypeMessage("success");
            setAlertMessage("Cadastrado de cliente realizado com sucesso!");
          } catch (error: any) {
            let message = "";

            if (error?.message) {
              message += error?.message + " ";
            }

            if (error?.response?.data?.message) {
              message += error?.response?.data?.message + " ";
            }

            if (error?.response?.data?.validation?.body?.message) {
              message += error?.response?.data?.validation?.body?.message + " ";
            }

            setAlert(true);
            setTypeMessage("danger");
            setAlertMessage(
              "Erro ao cadatrar cliente!! Err Message: " + message
            );
          } finally {
            await wait(4);
            actionsFinally();
          }
        }}
      >
        {({
          errors,
          touched,
          validateForm,
          submitForm,
          isSubmitting,
          values,
          setSubmitting,
        }) => {
          return (
            <Form
              style={{ display: "flex", flexWrap: "wrap", paddingTop: "25px" }}
            >
              <Group
                as={Col}
                sm="5"
                className="ms-3"
                style={{ textAlign: "start", height: "105px" }}
              >
                <Label>Nome Completo*:</Label>
                <Field
                  as={Control}
                  type="text"
                  name="name"
                  maxLength={30}
                  placeholder="Digite o nome"
                  isValid={validFormFields(errors, errors.name, touched)}
                />
                <ErrorMessage
                  name="name"
                  render={(msg) => (
                    <Alert className="pt-1 pb-1 mb-0" variant="danger">
                      {msg}
                    </Alert>
                  )}
                />
              </Group>
              <Group
                as={Col}
                sm="5"
                className="ms-3"
                style={{ textAlign: "start", height: "105px" }}
              >
                <Label>CPF*</Label>
                <Control
                  type="text"
                  mask="000.000.000-00"
                  maxLength={14}
                  name="cpf"
                  value={hasCpf}
                  onChange={(e) => {
                    const value = e.target.value?.trim();
                    setHasCpf(value);
                    if (value?.trim() === "" || value?.trim()?.length < 14) {
                      setFocusCpf(false);
                    }
                  }}
                  onBlur={(e) => {
                    setFocusCpf(true);
                    if (e.target.value?.trim() === "") {
                      setFocusCpf(false);
                    }
                  }}
                  as={IMaskInput}
                  placeholder="Digite o cpf"
                  isValid={
                    !focusCpf && (!hasCpf || hasCpf?.trim()?.length < 14)
                      ? false
                      : focusCpf && (!hasCpf || hasCpf?.trim()?.length < 14)
                      ? false
                      : true
                  }
                />
                {!focusCpf && !hasCpf ? (
                  <Alert className="pt-1 pb-1 mb-0" variant="danger">
                    cpf is a required field
                  </Alert>
                ) : null}
              </Group>
              <Group
                as={Col}
                sm="5"
                className="ms-3 mt-3"
                style={{ textAlign: "start", height: "105px" }}
              >
                <Label>Email*:</Label>
                <Field
                  type="email"
                  name="email"
                  maxLength={60}
                  placeholder="Digite o email"
                  as={Control}
                  isValid={validFormFields(errors, errors.email, touched)}
                >
                  {(e: any) => {
                    return (
                      <div>
                        <input
                          type="email"
                          placeholder="Digite o email"
                          className={`form-control ${
                            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
                              e.field.value?.trim()
                            )
                              ? ` is-valid`
                              : ``
                          }`}
                          {...e.field}
                        />
                      </div>
                    );
                  }}
                </Field>
                <ErrorMessage
                  name="email"
                  render={(msg) => (
                    <Alert className="pt-1 pb-1 mb-0" variant="danger">
                      {msg}
                    </Alert>
                  )}
                />
              </Group>
              <Group
                as={Col}
                sm="6"
                className="ms-3 align-content-center"
                style={{ textAlign: "start", display: "grid", height: "120px" }}
              >
                <Label>Cor Preferida:</Label>
                <Control
                  className="align-middle"
                  defaultValue="#5e72e4"
                  as={InputColor}
                  initialValue="#5e72e4"
                  placement="right"
                  onChange={(e: any) => {
                    setCor(e?.hex);
                  }}
                />
              </Group>
              <Group
                as={Col}
                sm="11"
                className="ms-3 mt-3"
                style={{ textAlign: "start" }}
              >
                <Label>Observação:</Label>
                <Control
                  as="textarea"
                  name="obs"
                  rows={4}
                  cols={25}
                  value={obs}
                  onChange={(e) => {
                    setObs(e.target.value?.trim());
                  }}
                  maxLength={100}
                  className="w-25"
                  style={{ resize: "none" }}
                />
              </Group>
              <Button
                hidden={hidden}
                onClick={(event) => {
                  event.preventDefault();
                  validateForm().then((e: any) => {
                    setLoading(false);
                    setHidden(true);
                    let flag = true;
                    const keys = Object.keys(e);

                    if (keys.length) {
                      const keysValid = keys.filter(
                        (k) => !["color", "cpf"].includes(k)
                      );

                      if (keysValid.length) {
                        keysValid.forEach((key) => {
                          if (e[key]?.length) {
                            flag = false;
                          }
                        });
                      }
                    }

                    if (flag && !hasCpf?.length) {
                      flag = false;
                    }

                    if (flag) {
                      values.color = cor;
                      values.cpf = hasCpf;
                      values.observation = obs;

                      setSubmitting(true);
                      submitForm();
                    } else {
                      actionsFinally();
                    }
                  });
                }}
                className="mt-3 ms-3"
                style={{ width: "10%" }}
                type="submit"
              >
                Salvar
              </Button>
              <Spinner
                style={{ marginRight: "4%", marginLeft: "2%", marginTop: "2%" }}
                hidden={loading}
                animation="border"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;
