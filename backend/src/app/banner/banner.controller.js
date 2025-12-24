class BannerController {
   createBanner = (req, res, next) =>{
    res.status(200).json({
        data: "banner created",
        message:"banner has been c=successfully created",
        status:"ok"
    })

   };

   listAllBanner= (req, res, next) =>{
      res.status(200).json({
        data: null,
        message: "List of all banners",
        status: "ok",
      });
   
    };

   viewBannerDetailById = (req, res, next) =>{
    const params = req.params;
    res.json({
      data: {params},
      mesage:"Banner details by Id "+params.id,
      status:"ok"
    })

   };

   updateBannerById= (req, res, next) =>{
    const params= req.params;
    res.json({
      data: { params },
      mesage: "Updating Banner of " + params.id,
      status: "ok",
    });

   };

   deleteBannerById= (req, res, next) =>{
    const params= req.params;
    res.json({
      data: { params },
      mesage: "Deletng Banner of " + params.id,
      status: "ok",
    });
   }  

  }

const bannerCtrl = new BannerController;

module.exports = bannerCtrl;
