const { migrate } = require("../migrate/helpers/migrate");
const { migrateItems } = require("../migrate/helpers/migrateFields");

// Tables that should not be proccessed later
const processedTables = [];

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate("blog_overview_page", "blog_overview_pages", (item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  // Empty
  // await migrate(
  //   "blog_overview_page_components",
  //   "blog_overview_pages_components",
  //   (item) => ({
  //   })
  // );

  await migrate("blogs", "blogs", (item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
    published_at: getTimestamp(),
  }));

  await migrate("blogs_components", "blogs_components", (item) => ({
    id: item.id,
    field: item.field,
    order: item.order,
    component_type: getComponent(item.component_type),
    component_id: item.component_id,
    entity_id: item.blog_id,
  }));

  await migrate("blogs_tags__tags_blogs", "blogs_tags_links", (item) => ({
    blog_id: item.blog_id,
    tag_id: item.tag_id,
  }));

  // Components

  await migrate(
    "components_diensten_afbeeldingen_bloks",
    "components_diensten_afbeeldingen_bloks",
    (item) => ({
      id: item.id,
      description: item.description,
    })
  );

  await migrate(
    "components_diensten_afbeeldingen_bloks_components",
    "components_diensten_afbeeldingen_bloks_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item.components_diensten_afbeeldingen_blok_id,
    })
  );

  await migrate(
    "components_frontend_bouwstenen_bloks",
    "components_frontend_bouwstenen_bloks",
    (item) => ({
      id: item.id,
      title: item.title,
      button_text: item.button_text,
      button_url: item.button_url,
    })
  );

  await migrate(
    "components_frontend_bouwstenen_bloks_components",
    "components_frontend_bouwstenen_bloks_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item.components_frontend_bouwstenen_blok_id,
    })
  );

  await migrate(
    "components_frontend_cta_bloks",
    "components_frontend_cta_bloks",
    (item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      button_text: item.button_text,
      type: item.type,
      url: item.url,
    })
  );

  await migrate(
    "components_frontend_cta_bloks_components",
    "components_frontend_cta_bloks_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item.components_frontend_cta_blok_id,
    })
  );

  await migrate(
    "components_frontend_diensten_categorie_bloks",
    "components_diensten_diensten_bloks",
    (item) => ({
      id: item.id,
      title: item.title,
    })
  );

  await migrate(
    "components_frontend_diensten_categorie_bloks_components",
    "components_diensten_diensten_bloks_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["components_frontend_diensten_categorie_blok_id"],
    })
  );

  await migrate(
    "components_frontend_even_voorstellen_bloks",
    "components_frontend_even_voorstellen_bloks",
    (item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      button_text: item.button_text,
      button_url: item.button_url,
    })
  );

  await migrate(
    "components_frontend_magnet_bloks",
    "components_frontend_magnet_bloks",
    (item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      magnet_type: item.magnet_type,
      url: item.url,
      display_type: item.display_type,
      button_text: item.button_text,
      display_after_seconds: item.display_after_seconds,
      display_after_scroll: item.display_after_scroll,
    })
  );

  await migrate(
    "components_frontend_magnet_bloks_components",
    "components_frontend_magnet_bloks_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["components_frontend_magnet_blok_id"],
    })
  );

  await migrate(
    "components_frontend_opdrachtgever_bloks",
    "components_frontend_opdrachtgever_bloks",
    (item) => ({
      id: item.id,
      title: item.title,
      button_text: item.button_text,
      button_url: item.button_url,
      owner_name: item.owner_name,
      owner_company: item.owner_company,
    })
  );

  await migrate(
    "components_frontend_partners_and_certificates",
    "components_frontend_pc_bloks",
    (item) => ({
      id: item.id,
    })
  );

  await migrate(
    "components_frontend_partners_and_certificates_components",
    "components_frontend_pc_bloks_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["components_frontend_partners_and_certificate_id"],
    })
  );

  // Empty
  // components_frontend_projecten_bloks
  // components_frontend_projecten_bloks_components

  await migrate(
    "components_frontend_samenwerkingen_bloks",
    "components_frontend_samenwerkingen_bloks",
    (item) => ({
      id: item.id,
      title: item.title,
    })
  );

  // Already migrated
  await migrate(
    "components_frontend_samenwerkingen_bloks_components",
    "components_frontend_samenwerkingen_bloks_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["components_frontend_samenwerkingen_blok_id"],
    })
  );

  await migrate(
    "components_frontend_seo_configuraties",
    "components_frontend_seo_configuraties",
    (item) => ({
      id: item.id,
      canonical: item.canonical,
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      structured_data: item.structured_data,
    })
  );

  await migrate(
    "components_frontend_sliders",
    "components_frontend_sliders",
    (item) => ({
      id: item.id,
    })
  );

  //Empty
  // components_frontend_team_bloks
  // components_frontend_team_bloks_components

  await migrate(
    "components_general_bouwsteens",
    "components_general_bouwsteens",
    (item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
    })
  );

  await migrate(
    "components_general_buttons",
    "components_general_buttons",
    (item) => ({
      id: item.id,
      text: item.text,
      url: item.url,
      type: item.type,
    })
  );

  await migrate(
    "components_general_cijfers",
    "components_general_cijfers",
    (item) => ({
      id: item.id,
      number: item.number,
      description: item.description,
    })
  );

  await migrate(
    "components_general_contents",
    "components_general_contents",
    (item) => ({
      id: item.id,
      content: item.content,
    })
  );

  await migrate(
    "components_general_dienst_kaartjes",
    "components_diensten_dienst_kaartjes",
    (item) => ({
      id: item.id,
      title: item.title,
      short_description: item.short_description,
      color: item.color,
      prominent: item.prominent,
    })
  );

  await migrate(
    "components_general_dienst_kaartjes",
    "components_diensten_dienst_kaartjes_pagina_links",
    (item) => ({
      dienst_kaartje_id: item.id,
      page_id: item.pagina,
    })
  );

  await migrate(
    "components_general_images",
    "components_general_images",
    (item) => ({
      id: item.id,
    })
  );

  await migrate(
    "components_general_input_fields_cta",
    "components_general_input_fields_cta",
    (item) => ({
      id: item.id,
      type: item.type,
      placeholder: item.placeholder,
      width: item.width,
      label: item.label,
      label_text: item.label_text,
    })
  );

  await migrate(
    "components_general_logos",
    "components_general_logos",
    (item) => ({
      id: item.id,
      url: item.url,
    })
  );

  await migrate(
    "components_general_menu_items",
    "components_general_menu_items",
    (item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
    })
  );

  await migrate(
    "components_general_menu_secties",
    "components_general_menu_secties",
    (item) => ({
      id: item.id,
      title: item.title,
    })
  );

  await migrate(
    "components_general_menu_secties_components",
    "components_general_menu_secties_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["components_general_menu_secty_id"],
    })
  );

  await migrate(
    "components_general_pc_lists",
    "components_general_pc_lists",
    (item) => ({
      id: item.id,
      url: item.url,
      new_page: item.new_page,
      follow: item.follow,
    })
  );

  // Empty
  // components_general_project_kaartjes
  // components_general_teamlid_kaartjes
  // components_general_teamlid_kaartjes__author

  await migrate(
    "components_home_bedrijfscijfers_bloks",
    "components_home_bedrijfscijfers_bloks",
    (item) => ({
      id: item.id,
    })
  );

  await migrate(
    "components_home_bedrijfscijfers_bloks_components",
    "components_home_bedrijfscijfers_bloks_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["components_home_bedrijfscijfers_blok_id"],
    })
  );

  await migrate("components_home_heroes", "components_home_heroes", (item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
  }));

  await migrate(
    "components_home_heroes_components",
    "components_home_heroes_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["components_home_hero_id"],
    })
  );

  await migrate(
    "components_vacature_vacature_bloks",
    "components_vacature_vacature_bloks",
    (item) => ({
      id: item.id,
      title: item.title,
    })
  );

  await migrate(
    "components_vacature_vacature_bloks_components",
    "components_vacature_vacature_bloks_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["components_vacature_vacature_blok_id"],
    })
  );

  await migrate(
    "components_vacature_vacature_kaartjes",
    "components_vacature_vacature_kaartjes",
    (item) => ({
      id: item.id,
      title: item.title,
      short_description: item.short_description,
      color: item.color,
      prominent: item.prominent,
    })
  );

  await migrate(
    "components_vacature_vacature_kaartjes",
    "components_vacature_vacature_kaartjes_pagina_links",
    (item) => ({
      vacature_kaartje_id: item.id,
      page_id: item.pagina,
    })
  );

  // Already migrated
  // await migrate(
  //   "core_store",
  //   "strapi_core_store_settings",
  //   (item) => ({
  //   })
  // );

  await migrate("dienstens", "dienstens", (item) => ({
    id: item.id,
    title: item.title,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  await migrate("dienstens_components", "dienstens_components", (item) => ({
    id: item.id,
    field: item.field,
    order: item.order,
    component_type: getComponent(item.component_type),
    component_id: item.component_id,
    entity_id: item["diensten_id"],
  }));

  await migrate("footer_menus", "footer_menus", (item) => ({
    id: item.id,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  await migrate(
    "footer_menus_components",
    "footer_menus_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["footer_menu_id"],
    })
  );

  await migrate("homes", "homes", (item) => ({
    id: item.id,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  await migrate("homes_components", "homes_components", (item) => ({
    id: item.id,
    field: item.field,
    order: item.order,
    component_type: getComponent(item.component_type),
    component_id: item.component_id,
    entity_id: item["home_id"],
  }));

  await migrate("main_menus", "main_menus", (item) => ({
    id: item.id,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  await migrate("main_menus_components", "main_menus_components", (item) => ({
    id: item.id,
    field: item.field,
    order: item.order,
    component_type: getComponent(item.component_type),
    component_id: item.component_id,
    entity_id: item["main_menu_id"],
  }));

  await migrate("ons_teams", "ons_teams", (item) => ({
    id: item.id,
    title: item.title,
    top_description: item.top_description,
    bottom_description: item.bottom_description,
    subtitle: item.subtitle,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  await migrate(
    "ons_teams__team_members",
    "ons_teams_team_members_links",
    (item) => ({
      ons_team_id: item.ons_team_id,
      user_id: item.user_id,
    })
  );

  await migrate("ons_teams_components", "ons_teams_components", (item) => ({
    id: item.id,
    field: item.field,
    order: item.order,
    component_type: getComponent(item.component_type),
    component_id: item.component_id,
    entity_id: item["ons_team_id"],
  }));

  await migrate("ons-werk", "ons_werks", (item) => ({
    id: item.id,
    title: item.title,
    blob_type: item.blob_type,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  await migrate("ons-werk_components", "ons_werks_components", (item) => ({
    id: item.id,
    field: item.field,
    order: item.order,
    component_type: getComponent(item.component_type),
    component_id: item.component_id,
    entity_id: item["ons-werk_id"],
  }));

  await migrate("pages", "pages", (item) => ({
    id: item.id,
    title: item.title,
    slug_prefix: item.slug_prefix,
    slug: item.slug,
    intro: item.intro,
    blob_type: item.blob_type,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
    published_at: getTimestamp(),
  }));

  await migrate("pages_components", "pages_components", (item) => ({
    id: item.id,
    field: item.field,
    order: item.order,
    component_type: getComponent(item.component_type),
    component_id: item.component_id,
    entity_id: item["page_id"],
  }));

  await migrate("projects", "projects", (item) => ({
    id: item.id,
    title: item.title,
    short_description: item.short_description,
    owner_name: item.owner_name,
    owner_quote: item.owner_quote,
    owner_company: item.owner_company,
    slug: item.slug,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
    published_at: getTimestamp(),
  }));

  await migrate("projects_components", "projects_components", (item) => ({
    id: item.id,
    field: item.field,
    order: item.order,
    component_type: getComponent(item.component_type),
    component_id: item.component_id,
    entity_id: item["project_id"],
  }));

  await migrate(
    "projects_tags__tags_projects",
    "tags_projects_links",
    (item) => ({
      project_id: item.project_id,
      tag_id: item.tag_id,
    })
  );

  await migrate("redirects", "redirects", (item) => ({
    id: item.id,
    old_url: item.old_url,
    new_url: item.new_url,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  // Strapi tables
  await migrate("strapi_administrator", "admin_users", (item) => ({
    id: item.id,
    firstname: item.firstname,
    lastname: item.lastname,
    username: item.username,
    email: item.email,
    password: item.password,
    reset_password_token: item.resetPasswordToken,
    is_active: item.isActive,
  }));

  await migrate("strapi_users_roles", "admin_users_roles_links", (item) => ({
    user_id: item.user_id,
    role_id: item.role_id,
  }));

  await migrate("tags", "tags", (item) => ({
    id: item.id,
    name: item.name,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  // UP
  await migrate("users-permissions_user", "up_users", (item) => ({
    id: item.id,
    username: item.username,
    email: item.email,
    provider: item.provider,
    provider: item.provider,
    password: item.password,
    reset_password_token: item.resetPasswordToken,
    confirmed: item.confirmed,
    blocked: item.blocked,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
    first_name: item.first_name,
    last_name: item.last_name,
    job_function: item.job_function,
    linkedin_url: item.linkedin_url,
    phone: item.phone,
    position: item.position,
  }));

  await migrate("users-permissions_user", "up_users_role_links", (item) => ({
    user_id: item.id,
    role_id: item.role,
  }));

  await migrate("users-permissions_user", "up_users_blogs_links", (item) => ({
    user_id: item.id,
    blog_id: item.blogs,
  }));

  // Files already migrated

  await migrate("vacature_paginas", "vacature_paginas", (item) => ({
    id: item.id,
    title: item.title,
    created_by_id: item.created_by,
    updated_by_id: item.updated_by,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  await migrate(
    "vacature_paginas_components",
    "vacature_paginas_components",
    (item) => ({
      id: item.id,
      field: item.field,
      order: item.order,
      component_type: getComponent(item.component_type),
      component_id: item.component_id,
      entity_id: item["vacature_pagina_id"],
    })
  );
}

function getTimestamp() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ')
}

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

    default:
      return component;
  }
}

module.exports = {
  processedTables,
  migrateTables,
};
