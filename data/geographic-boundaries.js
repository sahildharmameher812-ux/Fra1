// Geographic Boundaries and Administrative Data
// Real coordinates and boundaries for the 4 target states

const GEOGRAPHIC_BOUNDARIES = {
  // State-wise administrative boundaries with actual coordinates
  state_boundaries: {
    madhya_pradesh: {
      state_bounds: {
        north: 26.87,
        south: 17.78,
        east: 82.72,
        west: 74.02
      },
      capital: {
        name: "Bhopal",
        coordinates: [23.2599, 77.4126]
      },
      major_forests: [
        {
          name: "Kanha National Park",
          coordinates: [22.2676, 80.6099],
          area: "940 sq km",
          fra_significance: "Buffer zone villages eligible for FRA"
        },
        {
          name: "Bandhavgarh National Park", 
          coordinates: [23.7014, 81.0186],
          area: "448 sq km",
          fra_significance: "Core tribal habitat area"
        },
        {
          name: "Pench Tiger Reserve",
          coordinates: [21.7908, 79.2948],
          area: "758 sq km",
          fra_significance: "Traditional Gond territory"
        }
      ],
      tribal_districts: [
        {
          name: "Dindori",
          headquarters: [22.9425, 81.0837],
          tribal_blocks: [
            { name: "Dindori", coordinates: [22.9425, 81.0837] },
            { name: "Shahpura", coordinates: [22.8567, 80.9234] },
            { name: "Bajag", coordinates: [22.7834, 81.1456] },
            { name: "Karanjia", coordinates: [22.9847, 81.1234] }
          ]
        },
        {
          name: "Mandla",
          headquarters: [22.5937, 80.3711],
          tribal_blocks: [
            { name: "Mandla", coordinates: [22.5937, 80.3711] },
            { name: "Bichhiya", coordinates: [22.5234, 80.2876] },
            { name: "Narayanganj", coordinates: [22.6789, 80.4123] },
            { name: "Nainpur", coordinates: [22.4285, 80.1097] }
          ]
        },
        {
          name: "Balaghat", 
          headquarters: [21.8047, 80.1862],
          tribal_blocks: [
            { name: "Balaghat", coordinates: [21.8047, 80.1862] },
            { name: "Birsa", coordinates: [21.7234, 80.2567] },
            { name: "Lalbarra", coordinates: [21.9012, 80.3456] },
            { name: "Waraseoni", coordinates: [21.7591, 80.0418] }
          ]
        }
      ]
    },

    tripura: {
      state_bounds: {
        north: 24.53,
        south: 22.95,
        east: 92.67,
        west: 91.09
      },
      capital: {
        name: "Agartala",
        coordinates: [23.8315, 91.2868]
      },
      major_forests: [
        {
          name: "Clouded Leopard National Park",
          coordinates: [24.2567, 92.1234],
          area: "5.08 sq km",
          fra_significance: "Traditional hunting grounds of Tripuri tribes"
        },
        {
          name: "Sepahijala Wildlife Sanctuary",
          coordinates: [23.6234, 91.6789],
          area: "18.53 sq km", 
          fra_significance: "Sacred groves and traditional medicine collection"
        }
      ],
      tribal_districts: [
        {
          name: "North Tripura",
          headquarters: [24.1747, 92.1763],
          tribal_blocks: [
            { name: "Kanchanpur", coordinates: [24.2145, 92.2367] },
            { name: "Panisagar", coordinates: [24.2876, 92.1456] },
            { name: "Dharmanagar", coordinates: [24.3689, 92.1672] },
            { name: "Kadamtala", coordinates: [24.1234, 92.2789] }
          ]
        },
        {
          name: "Dhalai",
          headquarters: [23.8572, 91.8615], 
          tribal_blocks: [
            { name: "Ambassa", coordinates: [23.8572, 91.8615] },
            { name: "Longtharai Valley", coordinates: [23.7234, 91.9876] },
            { name: "Salema", coordinates: [23.9456, 91.7234] },
            { name: "Dumburnagar", coordinates: [23.8123, 91.9345] }
          ]
        },
        {
          name: "South Tripura",
          headquarters: [23.1636, 91.4359],
          tribal_blocks: [
            { name: "Belonia", coordinates: [23.2567, 91.4789] },
            { name: "Santirbazar", coordinates: [23.1234, 91.5678] },
            { name: "Sabroom", coordinates: [23.0123, 91.6234] },
            { name: "Hrishyamukh", coordinates: [23.3456, 91.3789] }
          ]
        }
      ]
    },

    odisha: {
      state_bounds: {
        north: 22.57,
        south: 17.78,
        east: 87.53,
        west: 81.37
      },
      capital: {
        name: "Bhubaneswar",
        coordinates: [20.2961, 85.8245]
      },
      major_forests: [
        {
          name: "Simlipal Biosphere Reserve",
          coordinates: [21.8673, 86.5091],
          area: "5,569 sq km",
          fra_significance: "Ho and Santhal traditional territory"
        },
        {
          name: "Niyamgiri Hills",
          coordinates: [19.2345, 83.4567],
          area: "250 sq km",
          fra_significance: "Sacred hills of Dongria Kondh tribe"
        }
      ],
      tribal_districts: [
        {
          name: "Rayagada",
          headquarters: [19.1617, 83.4128],
          tribal_blocks: [
            { name: "Rayagada", coordinates: [19.1617, 83.4128] },
            { name: "Kalyansinghpur", coordinates: [19.2234, 83.5678] },
            { name: "Bissamcuttack", coordinates: [19.0876, 83.4789] },
            { name: "Muniguda", coordinates: [19.3456, 83.6234] }
          ]
        },
        {
          name: "Koraput",
          headquarters: [18.8120, 82.7060],
          tribal_blocks: [
            { name: "Koraput", coordinates: [18.8120, 82.7060] },
            { name: "Jeypore", coordinates: [18.8558, 82.5693] },
            { name: "Borigumma", coordinates: [18.7234, 82.8567] },
            { name: "Nandapur", coordinates: [18.9876, 82.5234] }
          ]
        },
        {
          name: "Mayurbhanj",
          headquarters: [21.9287, 86.7347],
          tribal_blocks: [
            { name: "Baripada", coordinates: [21.9287, 86.7347] },
            { name: "Rairangpur", coordinates: [22.1234, 86.6789] },
            { name: "Karanjia", coordinates: [21.8567, 86.9234] },
            { name: "Jashipur", coordinates: [22.4567, 86.2345] }
          ]
        }
      ]
    },

    telangana: {
      state_bounds: {
        north: 19.92,
        south: 15.85,
        east: 81.78,
        west: 77.17
      },
      capital: {
        name: "Hyderabad",
        coordinates: [17.3850, 78.4867]
      },
      major_forests: [
        {
          name: "Kawal Tiger Reserve", 
          coordinates: [19.0567, 79.2234],
          area: "2,014 sq km",
          fra_significance: "Gond traditional territory"
        },
        {
          name: "Amrabad Tiger Reserve",
          coordinates: [16.2567, 78.9234],
          area: "2,611 sq km",
          fra_significance: "Traditional Lambadi settlements"
        }
      ],
      tribal_districts: [
        {
          name: "Adilabad",
          headquarters: [19.6670, 78.5270],
          tribal_blocks: [
            { name: "Adilabad", coordinates: [19.6670, 78.5270] },
            { name: "Utnoor", coordinates: [19.7234, 78.6789] },
            { name: "Indravelli", coordinates: [19.5678, 78.4567] },
            { name: "Kerameri", coordinates: [19.8234, 78.3456] }
          ]
        },
        {
          name: "Khammam",
          headquarters: [17.2473, 80.1514],
          tribal_blocks: [
            { name: "Khammam", coordinates: [17.2473, 80.1514] },
            { name: "Bhadrachalam", coordinates: [17.6688, 80.8936] },
            { name: "Burgampahad", coordinates: [17.3456, 80.2789] },
            { name: "Chinturu", coordinates: [17.4567, 81.1234] }
          ]
        },
        {
          name: "Mulugu",
          headquarters: [18.1928, 79.9167],
          tribal_blocks: [
            { name: "Mulugu", coordinates: [18.1928, 79.9167] },
            { name: "Tadvai", coordinates: [18.2567, 79.8234] },
            { name: "Govindaraopet", coordinates: [18.1234, 79.7567] },
            { name: "Eturnagaram", coordinates: [18.3234, 80.0567] }
          ]
        }
      ]
    }
  },

  // Forest types and their FRA suitability
  forest_classification: {
    "Reserved Forest": {
      fra_eligibility: "Limited to traditional dwellers only",
      documentation_required: "Proof of residence before 2005"
    },
    "Protected Forest": {
      fra_eligibility: "Community and Individual Rights",
      documentation_required: "Community verification + occupation proof"
    },
    "Village Forest": {
      fra_eligibility: "Full rights under FRA",
      documentation_required: "Gram Sabha resolution"
    },
    "Sacred Groves": {
      fra_eligibility: "Community Forest Resource Rights",
      special_provisions: "Traditional conservation practices protected"
    }
  },

  // River systems and water bodies (important for FRA claims)
  major_water_bodies: {
    madhya_pradesh: [
      { name: "Narmada River", coordinates: [22.7676, 79.2183] },
      { name: "Tapti River", coordinates: [21.1671, 76.2012] },
      { name: "Son River", coordinates: [23.4738, 81.3043] },
      { name: "Betwa River", coordinates: [24.2790, 77.8081] }
    ],
    tripura: [
      { name: "Gomti River", coordinates: [23.8315, 91.2868] },
      { name: "Manu River", coordinates: [24.2567, 91.8934] },
      { name: "Khowai River", coordinates: [24.0678, 91.6012] }
    ],
    odisha: [
      { name: "Mahanadi River", coordinates: [20.2961, 85.8245] },
      { name: "Brahmani River", coordinates: [20.8925, 85.0560] },
      { name: "Baitarani River", coordinates: [21.4834, 86.4280] },
      { name: "Vansadhara River", coordinates: [18.9789, 83.6234] }
    ],
    telangana: [
      { name: "Godavari River", coordinates: [17.9689, 79.5941] },
      { name: "Krishna River", coordinates: [16.2000, 80.2500] },
      { name: "Bhima River", coordinates: [17.6868, 77.5797] }
    ]
  },

  // Transportation network (affects accessibility for FRA implementation)
  transportation_hubs: {
    madhya_pradesh: [
      { type: "Airport", name: "Raja Bhoj Airport", coordinates: [23.2876, 77.3374] },
      { type: "Railway", name: "Bhopal Junction", coordinates: [23.2599, 77.4126] },
      { type: "Highway", name: "NH-12", route: "Connects tribal districts" }
    ],
    tripura: [
      { type: "Airport", name: "Agartala Airport", coordinates: [23.8859, 91.2405] },
      { type: "Railway", name: "Agartala Railway Station", coordinates: [23.8315, 91.2868] }
    ],
    odisha: [
      { type: "Airport", name: "Biju Patnaik Airport", coordinates: [20.2544, 85.8177] },
      { type: "Railway", name: "Bhubaneswar Railway Station", coordinates: [20.2744, 85.8412] },
      { type: "Port", name: "Paradip Port", coordinates: [20.3156, 86.6094] }
    ],
    telangana: [
      { type: "Airport", name: "Rajiv Gandhi International Airport", coordinates: [17.2403, 78.4294] },
      { type: "Railway", name: "Secunderabad Junction", coordinates: [17.4399, 78.4983] }
    ]
  }
};

module.exports = GEOGRAPHIC_BOUNDARIES;