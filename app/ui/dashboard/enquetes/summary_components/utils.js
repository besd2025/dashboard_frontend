/**
 * DATA TRANSFORMATION
 * Handles both the new optimized structure and the previous list structure for backward compatibility.
 */
export const transformSurveyData = (data) => {
  if (!data) return null;

  // Check if it's the new optimized structure
  if (data.summary && data.stocks && data.movements) {
    return {
      total_enquetes: data.summary.total_enquetes || 0,
      total_cultivateurs: data.summary.total_cultivateurs || 0,
      total_quantity_initial_kg: data.stocks.initial_kg || 0,
      total_quantity_collected_kg: data.stocks.collected_kg || 0,
      quantity_remaining_kg: data.stocks.remaining_kg || 0,
      collected: {
        jaune: data.collected_details?.jaune_kg || 0,
        blanc: data.collected_details?.blanc_kg || 0,
      },
      transferred: {
        total: data.movements.transferred_kg || 0,
        jaune: data.movements.quantity_transferred_jaune_kg || 0,
        blanc: data.movements.quantity_transferred_blanc_kg || 0,
      },
      sold: {
        total: data.movements.sold_kg || 0,
        jaune: data.movements.quantity_sold_jaune_kg || 0,
        blanc: data.movements.quantity_sold_blanc_kg || 0,
      },
      received: {
        total: data.movements.received_kg || 0,
        jaune: data.movements.quantity_received_jaune_kg || 0,
        blanc: data.movements.quantity_received_blanc_kg || 0,
      },
      losses: {
        weevils: data.losses?.weevils_kg || 0,
        foreign_bodies: data.losses?.foreign_bodies_kg || 0,
        humid: data.losses?.humid_kg || 0,
        floor: data.losses?.floor_kg || 0,
      },
      quality: {
        aeration_rate: data.quality?.is_aerated ? 100 : 0,
        pallets_rate: data.quality?.has_pallets ? 100 : 0,
        pics_bags_rate: data.quality?.has_pics_bags ? 100 : 0,
        insecticide_rate: data.quality?.has_insecticide ? 100 : 0,
        matching_rate: data.quality?.is_quantity_matching ? 100 : 0,
        appreciation: data.quality?.appreciation || "N/A",
      },
    };
  }

  // Handle list structure (previous)
  const results = Array.isArray(data) ? data : data.results || [];
  if (results.length === 0) return null;

  const aggregated = results.reduce(
    (acc, curr) => {
      acc.total_enquetes += 1;
      acc.total_cultivateurs += Number(curr.total_cultivateurs) || 0;
      acc.total_quantity_initial_kg +=
        Number(curr.total_quantity_initial_kg) || 0;
      acc.total_quantity_collected_kg +=
        Number(curr.total_quantity_collected_kg) || 0;
      acc.quantity_remaining_kg += Number(curr.quantity_remaining_kg) || 0;

      acc.collected.jaune += Number(curr.quantity_collected_jaune_kg) || 0;
      acc.collected.blanc += Number(curr.quantity_collected_blanc_kg) || 0;

      acc.transferred.total +=
        Number(curr.quantity_transferred_jaune_kg || 0) +
        Number(curr.quantity_transferred_blanc_kg || 0);
      acc.transferred.jaune += Number(curr.quantity_transferred_jaune_kg) || 0;
      acc.transferred.blanc += Number(curr.quantity_transferred_blanc_kg) || 0;

      acc.sold.total +=
        Number(curr.quantity_sold_jaune_kg || 0) +
        Number(curr.quantity_sold_blanc_kg || 0);
      acc.sold.jaune += Number(curr.quantity_sold_jaune_kg) || 0;
      acc.sold.blanc += Number(curr.quantity_sold_blanc_kg) || 0;

      acc.received.total +=
        Number(curr.quantity_received_jaune_kg || 0) +
        Number(curr.quantity_received_blanc_kg || 0);
      acc.received.jaune += Number(curr.quantity_received_jaune_kg) || 0;
      acc.received.blanc += Number(curr.quantity_received_blanc_kg) || 0;

      acc.losses.weevils += Number(curr.weevils_qty_kg) || 0;
      acc.losses.foreign_bodies += Number(curr.foreign_bodies_qty_kg) || 0;
      acc.losses.humid += Number(curr.humid_qty_kg) || 0;
      acc.losses.floor += Number(curr.floor_qty_kg) || 0;

      // Quality Aggregation
      if (curr.is_aerated) acc.quality_sums.aeration += 1;
      if (curr.has_pallets) acc.quality_sums.pallets += 1;
      if (curr.has_pics_bags) acc.quality_sums.pics_bags += 1;
      if (curr.has_insecticide) acc.quality_sums.insecticide += 1;
      if (curr.is_quantity_matching) acc.quality_sums.matching += 1;

      acc.quality_sums.appreciation[curr.appreciation] =
        (acc.quality_sums.appreciation[curr.appreciation] || 0) + 1;

      return acc;
    },
    {
      total_enquetes: 0,
      total_cultivateurs: 0,
      total_quantity_initial_kg: 0,
      total_quantity_collected_kg: 0,
      quantity_remaining_kg: 0,
      collected: { jaune: 0, blanc: 0 },
      transferred: { total: 0, jaune: 0, blanc: 0 },
      sold: { total: 0, jaune: 0, blanc: 0 },
      received: { total: 0, jaune: 0, blanc: 0 },
      losses: { weevils: 0, foreign_bodies: 0, humid: 0, floor: 0 },
      quality_sums: {
        aeration: 0,
        pallets: 0,
        pics_bags: 0,
        insecticide: 0,
        matching: 0,
        appreciation: {},
      },
    },
  );

  // Finalize rates
  const count = aggregated.total_enquetes || 1;
  aggregated.quality = {
    aeration_rate: (aggregated.quality_sums.aeration / count) * 100,
    pallets_rate: (aggregated.quality_sums.pallets / count) * 100,
    pics_bags_rate: (aggregated.quality_sums.pics_bags / count) * 100,
    insecticide_rate: (aggregated.quality_sums.insecticide / count) * 100,
    matching_rate: (aggregated.quality_sums.matching / count) * 100,
    // Dominant appreciation
    appreciation: Object.keys(aggregated.quality_sums.appreciation).reduce(
      (a, b) =>
        aggregated.quality_sums.appreciation[a] >
        aggregated.quality_sums.appreciation[b]
          ? a
          : b,
      "N/A",
    ),
  };

  return aggregated;
};

export const MOCK_ILLUSTRATION_DATA = {
  summary: { total_enquetes: 42, total_cultivateurs: 1250 },
  stocks: { initial_kg: 45000, collected_kg: 40000, remaining_kg: 32000 },
  collected_details: { jaune_kg: 12000, blanc_kg: 28000 },
  movements: {
    transferred_kg: 20000,
    quantity_transferred_blanc_kg: 12000,
    quantity_transferred_jaune_kg: 8000,
    sold_kg: 12000,
    quantity_sold_blanc_kg: 7000,
    quantity_sold_jaune_kg: 5000,
    received_kg: 3000,
    quantity_received_blanc_kg: 2000,
    quantity_received_jaune_kg: 1000,
  },
  losses: {
    weevils_kg: 450,
    foreign_bodies_kg: 120,
    humid_kg: 300,
    floor_kg: 50,
  },
  quality: {
    is_aerated: true,
    has_pallets: true,
    has_pics_bags: true,
    has_insecticide: true,
    is_quantity_matching: true,
    appreciation: "Bon",
  },
};
