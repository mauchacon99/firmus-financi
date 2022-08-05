import React, { useState, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";

//components
import Button from "@mui/material/Button";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { listEntity } from "../data";
import VisNetwork from "../components/VisNetwork";
import BasicTable from "../components/BasicTable";
import Form from "../components/Form";
import Relationship from "../components/Relationship";
import RelationTable from "../components/RelationTable";
import Header from "../components/Header";

function App() {
  // arrays nodes
  const [state, setState] = useLocalStorage("state", []);
  const [nodes, setNodes] = useLocalStorage("nodes", []);
  const [edges, setEdges] = useLocalStorage("edges", []);

  const [showSummary, setShowSummary] = useLocalStorage("showSummary", true);
  const [, setImgPrint] = useState("");

  const componentRef = useRef();
  // Fields for add new entity or nodes
  const [formEntity, setFormEntity] = useState({
    id: "",
    entity: "",
    color: "",
    type: "",
  });
  // Fields for add edges
  const [fieldsEdges, setFieldsEdges] = useState({
    to: "",
    from: "",
    label: "es accionista de",
    font: { align: "middle" },
    arrows: "to",
  });
  const validation = () => {
    if (state.find((e) => e.id === formEntity.id)) return false;
    else return true;
  };
  const handleSubmitEntity = () => {
    if (validation() && formEntity.id && formEntity.entity) {
      //add nodes array
      setState([...state, formEntity]);
      // created node
      prepareNodes(formEntity);
      //clear inputs
      setFormEntity({
        id: "",
        entity: "",
        color: "",
        type: "",
      });
    } else alert(`Ah Ocurrido un error `);
  };
  const validateEdges = () => {
    const { to, from, label } = fieldsEdges;
    const value = edges.find(
      (e) => e.to === to && e.from === from && e.label === label
    );

    return value ? true : false;
  };
  const handleAddEdges = () => {
    //add edges array
    const { to, from, label } = fieldsEdges;
    validateEdges();
    if (to && from && label) {
      setEdges([...edges, fieldsEdges]);
      // clear input
      setFieldsEdges({
        to: "",
        from: "",
        label: "",
        font: { align: "middle" },
        arrows: "to",
      });
    }
  };
  const prepareNodes = (node) => {
    setNodes([
      {
        id: parseInt(node.id),
        label: node.entity,
        shape: "icon",
        icon: {
          face: "'FontAwesome'",
          code: listEntity.find((e) => e.id === node.type)?.icon,
          size: 50,
          color: node.color,
        },
      },
      ...nodes,
    ]);
  };
  const clearLocalStorage = () => {
    setState([]);
    setNodes([]);
    setEdges([]);
  };
  const handleSummary = () => {
    setShowSummary(!showSummary);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="flex items-center	p-3 sticky justify-between bg-white">
        <Header />
        {!showSummary && (
          <>
            <div className="group-buttons-previous-and-print">
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
            </div>
          </>
        )}
      </div>

      {showSummary && (
        <>
          <Form
            setFormEntity={setFormEntity}
            formEntity={formEntity}
            handleSubmitEntity={handleSubmitEntity}
            clearLocalStorage={clearLocalStorage}
            handleSummary={handleSummary}
          />
          <BasicTable rows={state} />
          <br />
          {state.length > 1 && (
            <Relationship
              nodes={state}
              fieldsEdges={fieldsEdges}
              setFieldsEdges={setFieldsEdges}
              AddEdges={handleAddEdges}
            />
          )}
          <RelationTable rows={edges} nodes={state} />
          <ReactToPrint content={() => componentRef.current} />
        </>
      )}

      {nodes.length > 0 && (
        <VisNetwork
          nodes={nodes}
          edges={edges}
          ref={componentRef}
          setImgPrint={setImgPrint}
        />
      )}
    </>
  );
}

export default App;
