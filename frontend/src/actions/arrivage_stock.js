export async function getAllBonArrivageOfMonth(token, month, year){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/get_all_bon_arrivage/' +month+ '/'+ year,
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


  export async function addBonArrivage(token, data){
      console.log("inside methode", token)
      const response = await fetch(
          '/pharm/api/add_bon_arrivage/',
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



    export async function addBonArrivageItem(token, data){
        console.log("inside methode", token)
        const response = await fetch(
            '/pharm/api/add_bon_arrivage_item/',
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



      export async function addBonArrivageItemCustom(token, data){
        console.log("inside methode", token)
        const response = await fetch(
            '/pharm/api/add_bon_arrivage_item_cust/',
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



      export async function getSelectedBonArrivage(token, id){

        const response = await fetch(
          '/pharm/api/get_selected_bon_arrivage/'+id,
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



      export async function updateBonArrivage(token, data, id){
          console.log("inside methode", token)
          const response = await fetch(
              '/pharm/api/update_bon_arrivage/'+id,
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
            console.log("status 200, response: ", JSON.parse(text));
            return JSON.parse(text);
          } else {
            console.log("failed", text);
            return "error";
          }
        
        };


        export async function deleteBonArrivage(token, id){
            console.log("inside methode", token)
            const response = await fetch(
                '/pharm/api/delete_bon_arrivage/'+id,
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




          export async function checkBonArrivageId(token, id){

            const response = await fetch(
              '/pharm/api/check_bon_arrivage_id/'+id,
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




          export async function getAllBonArrivageItems(token, month, year){
          
              const response = await fetch(
                '/pharm/api/get_all_bon_arrivage_items/' +month+ '/'+ year,
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



            export async function getSelectedBonArrivageItem(token, id){

                const response = await fetch(
                  '/pharm/api/get_selected_bon_arrivage_item/'+id,
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



              export async function updateBonArrivageItem(token, data, id){
                console.log("inside methode", token)
                const response = await fetch(
                    '/pharm/api/update_bon_arrivage_item/'+id,
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
                  console.log("status 200, response: ", JSON.parse(text));
                  return JSON.parse(text);
                } else {
                  console.log("failed", text);
                  return "error";
                }
              
              };



              export async function deleteBonArrivageItem(token, id){
                  console.log("inside methode", token)
                  const response = await fetch(
                      '/pharm/api/delete_bon_arrivage_item/'+id,
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




export async function getAllFournForSelect(token) {
  console.log("inside methode", token)
  const response = await fetch(
    '/pharm/api/get_fourn_for_selection/',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
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
  