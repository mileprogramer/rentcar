import "../css/table.css"

export default function DefaultTable({ data, columns, renderRow, noDataMsg, classForTable = "table table-striped", classForThead, classForBody }){

    if(Array.isArray(data) && data.length === 0){
        return <div className="alert alert-warning">
            {noDataMsg ? noDataMsg : "There is not data"}
        </div>
    }

    const renderColumns = () => {
        if(columns instanceof Array && columns?.length > 0){
            return columns.map((column, index) => <td key={index}>{column}</td>);
        }
    }

    const renderRows = () => {
        if(data instanceof Array && data?.length > 0){
            return data.map((item, index) => {
                return <tr key={index}>
                    {renderRow(item)}
                </tr>
            }) 
        }
    }

    return (
        <div className="table-container">
            <table className={classForTable}>
                <thead className={classForThead ? classForThead : ""}>
                    <tr>
                        {renderColumns()}
                    </tr>
                </thead>

                <tbody className={classForBody ? classForBody : ""}>
                    {renderRows()}
                </tbody>
            </table>
        
        </div>
    )

}