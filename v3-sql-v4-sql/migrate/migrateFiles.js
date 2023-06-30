const { migrate } = require("./helpers/migrate");
const { omit } = require("lodash");
const { snakeCase } = require("lodash/fp");
const { dbV3 } = require("../config/database");
const { migrateUids } = require("./helpers/migrateValues");

const processedTables = ["upload_file", "upload_file_morph"];
const newTables = ["files", "files_related_morphs"];

async function migrateTables() {
  // TODO have to migrate values
  console.log("Migrating files");

  const modelsDefs = await dbV3("core_store").where(
    "key",
    "like",
    "model_def_%"
  );

  const componentsMap = modelsDefs
    .map((item) => JSON.parse(item.value))
    .reduce(
      (acc, item) => ({
        ...acc,
        [item.collectionName]: migrateUids(item.uid),
      }),
      {}
    );

  await migrate(processedTables[0], newTables[0], (item) => {
    const withRenamedKeys = Object.keys(item).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [snakeCase(key)]: item[key] },
      }),
      {}
    );

    const newItem = {
      ...withRenamedKeys,
      created_by_id: item.created_by,
      updated_by_id: item.updated_by,
    };

    return omit(newItem, ["created_by", "updated_by"]);
  });

  await migrate(processedTables[1], newTables[1], (item) => {
    const newItem = {
      ...item,
      file_id: item.upload_file_id,
      related_type: getComponent(componentsMap[item.related_type]) || getComponent(item.related_type),
    };

    return omit(newItem, ["upload_file_id", "id"]);
  });
}

const migrateFiles = {
  processedTables,
  migrateTables,
};

module.exports = {
  migrateFiles,
};

function getComponent(component) {
  switch (component) {
    case "components_diensten_afbeeldingen_bloks":
      return "diensten.afbeeldingen-blok";
    case "components_general_dienst_kaartjes":
      return "diensten.dienst-kaartje";
    case "components_frontend_diensten_categorie_bloks":
      return "diensten.diensten-blok";

    case "components_frontend_bouwstenen_bloks":
      return "frontend.bouwstenen-blok";
    case "components_frontend_cta_bloks":
      return "frontend.cta-blok";
    case "components_frontend_even_voorstellen_bloks":
      return "frontend.even-voorstellen-blok";
    case "components_frontend_magnet_bloks":
      return "frontend.magnet-blok";
    case "components_frontend_opdrachtgever_bloks":
      return "frontend.opdrachtgever-blok";
    case "components_frontend_partners_and_certificates":
      return "frontend.pc-blok";
    case "components_frontend_projecten_bloks":
      return "frontend.projecten-blok";
    case "components_frontend_samenwerkingen_bloks":
      return "frontend.samenwerkingen-blok";
    case "components_frontend_seo_configuraties":
      return "frontend.seo-configuratie";
    case "components_frontend_sliders":
      return "frontend.slider";
    case "components_frontend_team_bloks":
    return "frontend.team-blok";

    case "components_general_bouwsteens":
      return "general.bouwsteen";
    case "components_general_buttons":
      return "general.button";
    case "components_general_cijfers":
      return "general.cijfer";
    case "components_general_contents":
      return "general.content";
    case "components_general_images":
      return "general.image";
    case "components_general_input_fields_cta":
      return "general.input_fields_cta";
    case "components_general_logos":
      return "general.logo";
    case "components_general_menu_items":
      return "general.menu-item";
    case "components_general_menu_secties":
      return "general.menu-sectie";
    case "components_general_pc_lists":
      return "general.pc-list";
    case "components_general_project_kaartjes":
      return "general.project-kaartje";
    case "components_general_teamlid_kaartjes":
      return "general.teamlid-kaartje";

    case "components_home_bedrijfscijfers_bloks":
      return "home.bedrijfscijfers-blok";
    case "components_home_heroes":
      return "home.hero";

    case "components_vacature_vacature_bloks":
      return "vacature.vacature-blok";
    case "components_vacature_vacature_kaartjes":
      return "vacature.vacature-kaartje";

    case "blogs":
      return "api::blog.blog";
    case "projects":
      return "api::project.project";
    case "users-permissions_user":
      return "plugin::users-permissions.user";
    
    default:
      return component;
  }
}
