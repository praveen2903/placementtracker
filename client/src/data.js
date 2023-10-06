import package1 from "./assets/packages1.jpg"
import package2 from "./assets/package2.jpg"
import package3 from "./assets/package3.jpg"
import package4 from "./assets/package4.jpg"
import package5 from "./assets/package5.jpg"
import package6 from "./assets/package6.jpg"
const data={
    menuItems:[
        {
          id:"home",
          name: "Home",
          href: "home",
        },
        {
          id:"home",
          name: "About",
          href: "about",
        },
        {
          id:"home",
          name: "Clubs",
          href: "clubs",
        },
      
        {
          id:"home",
          name: "Contact",
          href: "contact",
        },
    ],
    tutorials:[
      {
        id:"home",
        url:package1,
      },
      {
        id:"home",
        url:package2,
      },
      {
        id:"home",
        url:package3,
      },
      {
        id:"DANCE",
        url:package4,
      },
      {
        id:"DANCE",
        desc:"Previous dance tutorial",
      },
      {
        id:"DANCE",
        url:package5,
      },
      {
        id:"MUSIC",
        url:package6,
      },
      {
        id:"MUSIC",
        url:"https://youtu.be/-PDTmdkJAv8?si=rt8mXJ4p49sn37vv",
      },
      {
        id:"MUSIC",
        url:"https://www.youtube.com/watch?v=dyqvPUxiqqc",
      },
    ]
}
export default data;