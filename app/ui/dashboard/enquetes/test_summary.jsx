"use client";

import React from "react";
import SurveySummaryDashboard from "./survey_summary";

const mockData = {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 9,
            "enqueteur": {
                "id": 1,
                "first_name": "Jean Bertrand",
                "last_name": "BIBONIMANA",
                "adress": {
                    "id": 960,
                    "colline_code": "7040207",
                    "zone_code": {
                        "id": 157,
                        "zone_code": "70402",
                        "commune_code": {
                            "id": 46,
                            "commune_code": "704",
                            "province_code": {
                                "id": 7,
                                "province_code": "7",
                                "province_name": "KARUSI",
                                "created_at": "2025-10-27T17:00:33.292969Z",
                                "updated_at": "2025-10-27T17:00:33.293009Z"
                            },
                            "commune_name": "GITARAMUKA",
                            "created_at": "2025-10-27T17:00:33.352686Z",
                            "updated_at": "2025-10-27T17:00:33.352731Z"
                        },
                        "zone_name": "NTUNDA",
                        "created_at": "2025-10-27T17:00:33.579682Z",
                        "updated_at": "2025-10-27T17:00:33.579725Z"
                    },
                    "colline_name": "MUGENDE",
                    "created_at": "2025-10-27T17:00:35.295783Z",
                    "updated_at": "2025-10-27T17:00:35.295832Z"
                },
                "phone": "61908349",
                "identifiant": "bert",
                "is_active": true,
                "created_at": "2025-10-28T07:15:04.552269Z",
                "upadated_at": "2026-04-08T23:57:29.319932Z"
            },
            "hangar": {
                "id": 12,
                "hangar_name": "HANGAR COMMUNAL GIHARABUGA",
                "hangar_code": "1050401",
                "longitude": null,
                "latitude": null,
                "zone": "RUGAZI",
                "commune": "RUGAZI",
                "province": "BUBANZA",
                "created_at": "2025-10-27T17:00:58.924720Z",
                "update_at": "2025-10-27T17:00:58.924774Z"
            },
            "new_hangar_real_name": "HANGAR COMMUNAL GIHARABUGA",
            "hangar_level": "desengorgement",
            "gestionnaire_nom": "Test",
            "gestionnaire_prenom": "Etwg",
            "gestionnaire_sex": "M",
            "gestionnaire_cni": "1345",
            "gestionnaire_phone": "69880089",
            "total_cultivateurs": 0,
            "total_quantity_initial_kg": 3680.0,
            "quantity_collected_jaune_kg": 60.0,
            "quantity_collected_blanc_kg": 300.0,
            "total_quantity_collected_kg": 360.0,
            "has_transfer": true,
            "quantity_transferred_blanc_kg": 90.0,
            "quantity_transferred_jaune_kg": 0.0,
            "has_sales": true,
            "quantity_sold_blanc_kg": 30.0,
            "quantity_sold_jaune_kg": 60.0,
            "has_received": true,
            "quantity_received_blanc_kg": 6.0,
            "quantity_received_jaune_kg": 0.0,
            "quantity_remaining_kg": 3866.0,
            "is_quantity_matching": true,
            "real_quantity_remaining_kg": 0.0,
            "is_aerated": true,
            "has_pallets": true,
            "has_pics_bags": true,
            "appreciation": "Moyen",
            "has_weevils": true,
            "weevils_qty_kg": 500.0,
            "weevils_photo_path": null,
            "weevils_photo": "http://192.168.1.198/media/enquetes/images/86aa45d1-ff46-42d3-a3e7-80284f24a1f8.jpeg",
            "is_on_floor": false,
            "floor_qty_kg": 0.0,
            "floor_photo_path": "null",
            "floor_photo": null,
            "is_humid": false,
            "humid_qty_kg": 0.0,
            "humid_photo_path": "null",
            "humid_photo": null,
            "has_foreign_bodies": true,
            "foreign_bodies_nature": "Cailloux",
            "foreign_bodies_qty_kg": 300.0,
            "foreign_bodies_photo_path": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540cb634397%252Fsurvey/ImagePicker/1ff61684-0642-4f99-9279-82de8d0c0ba7.jpeg",
            "foreign_bodies_photo": "http://192.168.1.198/media/enquetes/images/1ff61684-0642-4f99-9279-82de8d0c0ba7.jpeg",
            "has_insecticide": true,
            "insecticide_details": "Assu",
            "comment": "23379",
            "latitude": -3.3962096,
            "longitude": 29.3764125,
            "precision": 21.6709995269775,
            "created_at": "2026-04-17T08:56:18.847933Z",
            "updated_at": "2026-04-17T08:56:18.850176Z"
        }
    ]
};

export default function TestSurveySummary() {
  return (
    <div className="p-8 bg-gray-50 dark:bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Aperçu des Enquêtes</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Synthèse globale des données de terrain et mouvements de stock.</p>
        </header>
        
        <SurveySummaryDashboard results={mockData.results} />
      </div>
    </div>
  );
}
