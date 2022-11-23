module.exports = {
  async index(ctx, next) {
    const { pid,sid } = ctx.params;
    console.log("param_id", pid);
    console.log("ss_id",sid);
    const entries = await strapi.db.query('api::event.event').findMany({
      fields: ['id', 'notes', 'participants'],
      select: ['id', 'notes', 'participants'],
      // if(participants) {
      //   const { id } = participants;
      //   console.log("id", id);
      // },
      populate: { category: true },
      where: { id: pid },
    });
    ctx.body = entries;
    console.log("entries",entries[0].participants[0].id);
    // console.log("entries",entries[0].participants);

    const uncofirm_array = [];
    const uncofirm = entries[0].participants;

    const testobj = Object.values(uncofirm);
  
    // This is filter 1 for update the particpant status
    if(sid){
    var filter1 = testobj.filter(function (value, index, arr) {
      return value.id == sid;
    });
    console.log("filter1", filter1);
  }

    let filter1_obj_for_udpate = {
      "id": '',
      "attributes": {
        "name": "",
        "tags": [
          {
            "id": 1,
            "title": ""
          }
        ],
        "email": "",
        "status": false,
        "contact": "",
        "createdAt": "",
        "updatedAt": "2022-11-20T12:29:53.048Z",
        "publishedAt": "2022-11-18T12:36:01.595Z"
      }

    }
 
    console.log("Attribute", filter1[0].attributes.name);
    // Udpate Filter 1
    if (filter1) {
        filter1_obj_for_udpate["id"] = filter1[0].id,
        filter1_obj_for_udpate["attributes"]["name"] = filter1[0].attributes.name,
        filter1_obj_for_udpate["attributes"]["tags"] = filter1[0].attributes.tags,
        filter1_obj_for_udpate["attributes"]["email"] = filter1[0].attributes.email,
        filter1_obj_for_udpate["attributes"]["status"] = "truebyme",
        filter1_obj_for_udpate["attributes"]["contact"] = filter1[0].attributes.contact,
        filter1_obj_for_udpate["attributes"]["createdAt"] = filter1[0].attributes.createdAt,
        filter1_obj_for_udpate["attributes"]["updatedAt"] = filter1[0].attributes.updatedAt,
        filter1_obj_for_udpate["attributes"]["publishedAt"] = filter1[0].attributes.publishedAt
    }

    var filter2 = testobj.filter(function (value, index, arr) {
      return value.id !== 5;
    });
    // console.log("filter2", filter2);


    //Combine filter1 and rest of the filters
    let ConfirmParticapantsArray = [];

    ConfirmParticapantsArray.push(filter1_obj_for_udpate);
 
 

    for (const i in filter2) {    
        ConfirmParticapantsArray.push(filter2[i]); 
    }

    console.log("ConfirmFilters",ConfirmParticapantsArray);
    

    
  }
};
