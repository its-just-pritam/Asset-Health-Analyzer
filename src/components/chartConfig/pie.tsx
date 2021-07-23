import { getColorsList } from "../colorParams";

const colors = getColorsList();

export const PieDataConfig = (percentages: any, variablename: any) => {
    return {
        labels: ['Faulty', 'Non-Faulty'],
        datasets: [
          {
            label: variablename,
            data: percentages,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            weight: 1,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };
};

export const PieOptionsConfig = (variablename: any) => { 
    return {
        responsive: true,
        animation: false,
        title: {
            text: variablename + " Faults",
            display: true
        },
        plugins: {
            legend: {
                labels: {
                    color: "white",
                    marginBottom: "100px",
                    position: "right"
                }
            },
        }
    }   
};