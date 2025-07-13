function refreshData(section) {
    const data = {
        'distributor-orders': { totalOrders: 50 },
        'distributor-sales': { totalSales: 1000 },
        'distributor-analytics': { performance: '75%' },
        'retailer-delivery': { nextDelivery: 'Friday, July 11, 2025' },
        'retailer-orders': { lastOrder: 'Delivered' },
        'order-overview': { pendingOrders: 10, completedOrders: 40 },
        'order-tracking': { latestUpdate: '01:06 PM, July 10, 2025' },
        'shipment-status': { pendingShipments: 5, completedShipments: 45 },
        'dispatch-schedule': { nextDispatch: 'Friday, July 11, 2025' },
        'area-schedule': { areas: 'D1, D2', schedule: 'Mon-Fri' },
        'products': { totalProducts: 20 },
        'sales-report': { commission: '$200' },
        'browse-products': { 'category-1': '10 Products', 'category-2': '15 Products' },
        'auto-order': { 'auto-order-status': 'Enabled' },
        'fast-delivery': { 'fast-delivery-status': 'Requested' },
        'order-history': { 'order-1': 'Delivered', 'order-2': 'Pending' }
    };
    if (section === 'distributor-orders') document.getElementById('total-orders').textContent = data[section].totalOrders;
    if (section === 'distributor-sales') document.getElementById('total-sales').textContent = data[section].totalSales;
    if (section === 'distributor-analytics') document.getElementById('performance').textContent = data[section].performance;
    if (section === 'retailer-delivery') document.getElementById('next-delivery').textContent = data[section].nextDelivery;
    if (section === 'retailer-orders') document.getElementById('last-order').textContent = data[section].lastOrder;
    if (section === 'order-overview') {
        document.getElementById('pending-orders').textContent = data[section].pendingOrders;
        document.getElementById('completed-orders').textContent = data[section].completedOrders;
    }
    if (section === 'order-tracking') document.getElementById('latest-update').textContent = data[section].latestUpdate;
    if (section === 'shipment-status') {
        document.getElementById('pending-shipments').textContent = data[section].pendingShipments;
        document.getElementById('completed-shipments').textContent = data[section].completedShipments;
    }
    if (section === 'dispatch-schedule') document.getElementById('next-dispatch').textContent = data[section].nextDispatch;
    if (section === 'area-schedule') {
        document.getElementById('areas').textContent = data[section].areas;
        document.getElementById('schedule').textContent = data[section].schedule;
    }
    if (section === 'products') document.getElementById('total-products').textContent = data[section].totalProducts;
    if (section === 'sales-report') document.getElementById('commission').textContent = data[section].commission;
    if (section === 'browse-products') {
        document.getElementById('category-1').textContent = data[section]['category-1'];
        document.getElementById('category-2').textContent = data[section]['category-2'];
    }
    if (section === 'auto-order') document.getElementById('auto-order-status').textContent = data[section]['auto-order-status'];
    if (section === 'fast-delivery') document.getElementById('fast-delivery-status').textContent = data[section]['fast-delivery-status'];
    if (section === 'order-history') {
        document.getElementById('order-1').textContent = data[section]['order-1'];
        document.getElementById('order-2').textContent = data[section]['order-2'];
    }
    alert(`Data refreshed for ${section.replace('-', ' ')} at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })}`);
}