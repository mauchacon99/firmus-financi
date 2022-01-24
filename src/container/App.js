import React, { useState } from "react";
//components
import VisNetwork from "../components/VisNetwork";
import BasicTable from "../components/BasicTable";
import Form from "../components/Form";
import Relationship from "../components/Relationship";
import RelationTable from "../components/RelationTable";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { listEntity } from "../data";

function App() {
  // arrays nodes
  const [state, setState] = useLocalStorage("state", []);
  const [nodes, setNodes] = useLocalStorage("nodes", []);
  const [edges, setEdges] = useLocalStorage("edges", []);

  const [formEntity, setFormEntity] = useState({
    id: "",
    entity: "",
    color: "",
    type: "",
  });

  const [fieldsEgdes, setFieldsEgdes] = useState({
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
    const { to, from, label } = fieldsEgdes;
    const value = edges.find(
      (e) => e.to === to && e.from === from && e.label === label
    );

    return value ? true : false;
  };
  const handleAddEgdes = () => {
    //add edges array
    const { to, from, label } = fieldsEgdes;
    validateEdges();
    if (to && from && label) {
      setEdges([...edges, fieldsEgdes]);
      // clear input
      setFieldsEgdes({
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
  const clearLocalstorage = () => {
    setState([]);
    setNodes([]);
    setEdges([]);
  };
  return (
    <>
      <img
        className="logo"
        alt="logo-company"
        src={process.env.PUBLIC_URL + '/img/logo.png'}
      />
      <Form
        setFormEntity={setFormEntity}
        formEntity={formEntity}
        handleSubmitEntity={handleSubmitEntity}
        clearLocalstorage={clearLocalstorage}
      />
      <BasicTable rows={state} />
      <br />
      {state.length > 1 && (
        <Relationship
          nodes={state}
          fieldsEgdes={fieldsEgdes}
          setFieldsEgdes={setFieldsEgdes}
          AddEgdes={handleAddEgdes}
        />
      )}
      <RelationTable rows={edges} nodes={state} />

      {nodes.length > 0 && <VisNetwork nodes={nodes} edges={edges} />}
    </>
  );
}

export default App;
