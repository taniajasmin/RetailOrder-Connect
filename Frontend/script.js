let token = null;

async function login() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'test', password: 'test' })
        });
        const data = await response.json();
        if (response.ok) {
            token = data.token;
            localStorage.setItem('token', token); // Store token for future requests
            alert('Login successful!');
            console.log('Token:', token);
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        alert('Error during login: ' + error.message);
    }
}

async function refreshData(section) {
    try {
        if (!token) {
            alert('Please log in first!');
            return;
        }

        let url = '';
        switch (section) {
            case 'distributor-dashboard':
                url = 'http://localhost:5000/api/orders'; // Example endpoint, adjust as needed
                break;
            case 'area-schedule':
                url = 'http://localhost:5000/api/deliveries';
                break;
            case 'products':
                url = 'http://localhost:5000/api/products';
                break;
            case 'order-list':
                url = `http://localhost:5000/api/orders/filter?area=D1`; // Example filter
                break;
            case 'sales-report':
                url = 'http://localhost:5000/api/orders'; // Adjust for sales data
                break;
            case 'retailer-dashboard':
                url = 'http://localhost:5000/api/orders'; // Adjust for retailer data
                break;
            case 'browse-products':
                url = 'http://localhost:5000/api/products';
                break;
            case 'order-form':
                // No fetch needed unless submitting
                break;
            case 'auto-order':
                // No fetch needed unless checking status
                break;
            case 'fast-delivery':
                // No fetch needed unless checking status
                break;
            case 'order-history':
                url = 'http://localhost:5000/api/orders'; // Adjust for history
                break;
            default:
                alert('Invalid section');
                return;
        }

        if (url) {
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                updateUI(section, data);
            } else {
                alert('Failed to fetch data: ' + data.message);
            }
        } else {
            // Handle sections without fetch (e.g., form submissions)
            updateUI(section, {});
        }
    } catch (error) {
        alert('Error refreshing data: ' + error.message);
    }
    alert(`Data refreshed for ${section.replace('-', ' ')} at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })}`);
}

function updateUI(section, data) {
    switch (section) {
        case 'distributor-dashboard':
            document.getElementById('total-orders').textContent = data.length || 0;
            document.getElementById('total-sales').textContent = data.reduce((sum, order) => sum + (order.quantity * 20), 0) || 0; // Example calculation
            document.getElementById('areas').textContent = data.map(order => order.area).join(', ') || 'N/A';
            break;
        case 'area-schedule':
            document.getElementById('d1-schedule').textContent = data[0]?.schedule || 'N/A';
            document.getElementById('frequency').textContent = data[0]?.frequency || 'N/A';
            break;
        case 'products':
            document.getElementById('total-products').textContent = data.length || 0;
            break;
        case 'order-list':
            document.getElementById('pending-orders').textContent = data.filter(order => order.status === 'pending').length || 0;
            document.getElementById('delivered-orders').textContent = data.filter(order => order.status === 'delivered').length || 0;
            break;
        case 'sales-report':
            document.getElementById('commission').textContent = data.length * 5 || 0; // Example: 5 per order
            document.getElementById('fast-delivery-charges').textContent = 'Variable'; // To be calculated
            break;
        case 'retailer-dashboard':
            document.getElementById('next-delivery').textContent = 'Friday, July 18, 2025'; // Static for now
            document.getElementById('auto-orders').textContent = data.filter(order => order.auto).length || 0 + ' Active';
            document.getElementById('last-order').textContent = data.length ? data[data.length - 1].status : 'N/A';
            break;
        case 'browse-products':
            document.getElementById('available-products').textContent = data.filter(p => p.status === 'active').length || 0;
            break;
        case 'order-form':
            document.getElementById('order-confirmation').textContent = 'Order placed successfully!'; // Set after submission
            break;
        case 'auto-order':
            document.getElementById('auto-order-status').textContent = 'Enabled'; // Toggle logic needed
            break;
        case 'fast-delivery':
            document.getElementById('estimated-cost').textContent = '$5'; // Calculate based on weight/distance
            document.getElementById('fast-delivery-status').textContent = 'In Progress';
            break;
        case 'order-history':
            document.getElementById('order-1-status').textContent = data[0]?.status || 'N/A';
            document.getElementById('order-2-status').textContent = data[1]?.status || 'N/A';
            break;
    }
}

async function addArea() {
    if (!token) {
        alert('Please log in first!');
        return;
    }
    const newArea = document.getElementById('new-area').value;
    if (newArea) {
        const response = await fetch('http://localhost:5000/api/deliveries', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ area: newArea, schedule: 'Sunday', frequency: 'weekly' })
        });
        const data = await response.json();
        if (response.ok) alert(`Area ${newArea} added successfully!`);
        else alert('Failed to add area: ' + data.message);
        document.getElementById('new-area').value = '';
    }
}

async function addProduct() {
    if (!token) {
        alert('Please log in first!');
        return;
    }
    const newProduct = document.getElementById('new-product').value;
    const status = document.getElementById('product-status').value;
    if (newProduct) {
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newProduct, company: 'ABC', category: 'Food', price: 20, status })
        });
        const data = await response.json();
        if (response.ok) alert(`Product ${newProduct} (${status}) added successfully!`);
        else alert('Failed to add product: ' + data.message);
        document.getElementById('new-product').value = '';
    }
}

async function toggleAutoOrder() {
    if (!token) {
        alert('Please log in first!');
        return;
    }
    const status = document.getElementById('auto-order-status').textContent === 'Enabled' ? 'Disabled' : 'Enabled';
    document.getElementById('auto-order-status').textContent = status;
    // API call to update auto order status would go here
    alert(`Auto Order ${status} successfully!`);
}

async function requestFastDelivery() {
    if (!token) {
        alert('Please log in first!');
        return;
    }
    const weight = document.getElementById('delivery-weight').value;
    const distance = document.getElementById('delivery-distance').value;
    const cost = weight && distance ? `$${(parseInt(weight) + parseInt(distance))}` : '$5';
    document.getElementById('estimated-cost').textContent = cost;
    document.getElementById('fast-delivery-status').textContent = 'Requested';
    // API call to submit fast delivery request would go here
    alert(`Fast Delivery requested with estimated cost ${cost}!`);
}

async function repeatOrder(orderId) {
    if (!token) {
        alert('Please log in first!');
        return;
    }
    // API call to repeat order would go here
    alert(`Repeating Order ${orderId}...`);
}