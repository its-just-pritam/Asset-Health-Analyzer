import { Grid,Modal } from "@scuf/common";
import React from "react";
import { storageDataParams } from "../components/storage";
import { DataTable } from "@scuf/datatable";
import {changeData} from "../components/Data"

export default function FaultyData (open: any, StateCallback: any, Data: any, Message: any) {
      const params = storageDataParams();
      const data = Data;
      const message = Message;
      let field:any;
      if(message==="historical")
      {
            field="Fault Occurred time"
      }
      else if(message==="predicted")
      {
          field="Fault expected time"
      }

    function ShowEachTable(item: any, index: any) {

        let headingName = item.charAt(0).toUpperCase() + item.slice(1) + " Faults";
    
        return (
            <>
                        <h3 style={{margin: "0 0 1em 0"}}>
                            {headingName}
                        </h3>
                        <div style={{marginBottom: "2em"}}>
                            <DataTable
                                data={changeData(data, index)}
                                reorderableColumns={true}
                                resizableColumns={true}
                                scrollable={true}
                                scrollHeight="380px"
                            >
                                <DataTable.Column
                                field="Notification_id"
                                header="Notification_id"
                                renderer={(celldata) => (
                                    <div>{celldata.rowData.id}</div>
                                )}
                                />
                                <DataTable.Column
                                field="faulty_value"
                                header="faulty_value"
                                renderer={(celldata) => (
                                    <div>{celldata.rowData.value}</div>
                                )}
                                />
                                <DataTable.Column
                                field={field}
                                header={field}
                                renderer={(celldata) => <div>{celldata.rowData.time}</div>}
                                />
                            </DataTable>
                        </div>
            </>
        );
      }

  return (
    <Modal closeIcon={true} onClose={() => StateCallback(false)} open={open} closeOnDimmerClick={false}>
    <Modal.Header>
        <div style={{margin: "0 0 1em 1em"}}>
            Faulty Data in Tabular Format
        </div>
    </Modal.Header>
    <Modal.Content>
        <Grid>
            <Grid.Row >
                <Grid.Column>
                <div style={{marginBottom:"90px"}}>
                    {params.map((item: any, index: any) => ShowEachTable(item, index))}
                </div>
                </Grid.Column>
            </Grid.Row>
            </Grid>
        </Modal.Content>
        </Modal>
      );
}