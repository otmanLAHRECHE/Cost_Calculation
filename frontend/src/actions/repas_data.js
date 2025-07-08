export async function getAllRepasByYearByMonth(token, month, year){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/get_repas/' +month+'/'+ year,
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





    export async function deleteRepas(token, id){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/delete_repas/'+id,
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



export async function addRepas(token, data){
      console.log("inside methode", token)
      const response = await fetch(
          '/pharm/api/add_repas/',
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


export async function updateRepas(token, data,id){
      console.log("inside methode", token)
      const response = await fetch(
          '/pharm/api/update_repas/'+id,
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
      if (response.status === 200) {
        console.log(JSON.parse(text));
        return JSON.parse(text);
      } else {
        console.log("failed", text);
        return "error";
      }
    
    };



    export async function getSelectedRepas(token, id){

    const response = await fetch(
      '/pharm/api/get_selected_repas/'+id,
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
    return "no data";
  }

};
