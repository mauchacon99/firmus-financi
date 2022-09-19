import React, { useState, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";

//components
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import VisNetwork from "../components/VisNetwork";
import Form from "../components/Form";
import RelationTable from "../components/RelationTable";
import Header from "../components/Header";
// hooks
import { useLocalStorage } from "../hooks/useLocalStorage";
import handleCustodyAccount from "../hooks/handleCustodyAccount";

// services
import custodyAccountService from "../services/custodyAccount.service.ts";

function App({ setLoading, stateApp, setStateApp }) {
  // arrays nodes
  const [state, setState] = useLocalStorage("state", {
    nodes: {},
    edges: {},
    data: {},
    showSummary: false,
  });

  const [, setImgPrint] = useState("");

  const [formEntity, setFormEntity] = useState({
    id: "",
  });
  const componentRef = useRef();

  const handleSubmitEntity = async () => {
    if (!state.data.length || state.data.AccountFirmus !== formEntity.id) {
      try {
        setLoading(true);
        clearLocalStorage();
        const { data } = await custodyAccountService.find(
          formEntity.id,
          stateApp.token
        );
        const { nodes, edges } = await handleCustodyAccount(data);
        setState({
          ...state,
          nodes,
          edges,
          data,
        });
        setLoading(false);
      } catch (error) {
        clearLocalStorage();
        setLoading(false);
        if (error.response.data.statusCode === 401) handleLogout();
      }
    }
  };

  const clearLocalStorage = () => {
    setFormEntity({
      id: "",
    });
    setState({
      showSummary: false,
      nodes: {},
      edges: {},
      data: {},
    });
  };

  const handleSummary = () => {
    setState({ ...state, showSummary: !state.showSummary });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleLogout = () => {
    setStateApp({
      user: {},
      message: null,
      token: null,
      isLogged: false,
    });
    clearLocalStorage();
    localStorage.clear();
  };

  return (
    <>
      <div className="flex items-center	p-3 sticky justify-between  bg-blue-50 mb-2">
        <Header />

        <div className="group-buttons-previous-and-print">
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => handleLogout()}
          >
            {" "}
            Cerrar Sesion{" "}
          </Button>
          {state.showSummary && (
            <>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleSummary}
              >
                {" "}
                ATRAS{" "}
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={handlePrint}
              >
                IMPRIMIR
              </Button>
            </>
          )}
        </div>
      </div>
      {!state.showSummary && (
        <>
          <Form
            setFormEntity={setFormEntity}
            formEntity={formEntity}
            setLoading={setLoading}
            handleSubmitEntity={handleSubmitEntity}
            clearLocalStorage={clearLocalStorage}
            handleSummary={handleSummary}
            handleLogout={handleLogout}
            setStateApp={setStateApp}
            stateApp={stateApp}
          />
          {state.data?.custodyAccountDetail && (
            <Alert
              severity={
                state.data.custodyAccountDetail.Active ? "success" : "error"
              }
            >
              <AlertTitle>
                {" "}
                Estado de la Cuenta Nro - {state.data.AccountFirmus}{" "}
              </AlertTitle>
              Estatus:{" "}
              {state.data.custodyAccountDetail.Active ? "Active" : "Inactiva"}
            </Alert>
          )}

          <br />
          <RelationTable
            rows={state.edges}
            nodes={state.nodes}
            data={state.data?.custodyAccountDetail?.declarationControl}
          />
          <ReactToPrint content={() => componentRef.current} />
        </>
      )}

      {state.nodes.length > 0 && (
        <VisNetwork
          nodes={state.nodes}
          edges={state.edges}
          ref={componentRef}
          setImgPrint={setImgPrint}
        />
      )}
    </>
  );
}

export default App;
