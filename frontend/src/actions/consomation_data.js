export async function getAllConsomationByYearByMonth(token, month, year){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/get_all_consomation_year/' +month+'/'+ year,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: JSON.stringify()
        }
    );
    const text = await response.text();
    if (response.status === 200) {
      console.log("get the data succesfully", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value]) => {
        fail(`${key}: ${value}`);
      });
      return "no data";
    }
  
  };


export async function generateConsomationByYearByMonth(token, month, year){
      console.log("inside methode", token)
      const response = await fetch(
          '/pharm/api/generate_consomation_by_year/'+month+'/'+year,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' +token,
            },
            body: JSON.stringify()
          }
      );
      const text = await response.text();
      if (response.status === 201) {
        console.log(JSON.parse(text));
        return JSON.parse(text);
      } else {
        console.log("failed", text);
        return "error";
      }
    
    };


    export async function deleteConsomationByMonthByYear(token, month, year){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/delete_consomation/'+month+'/'+year,
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' +token,
        },
        body: JSON.stringify()
      }
  );
  const text = await response.text();
  if (response.status === 200) {
    console.log("status 200, response: ", JSON.parse(text));
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "error";
  }

};



export async function saveStateConsomation(token, data){
      console.log("inside methode", token)
      const response = await fetch(
          '/pharm/api/save_consomation/',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' +token,
            },
            body: data
          }
      );
      const text = await response.text();
      if (response.status === 201) {
        console.log(JSON.parse(text));
        return JSON.parse(text);
      } else {
        console.log("failed", text);
        return "error";
      }
    
    };

