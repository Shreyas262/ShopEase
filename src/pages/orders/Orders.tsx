import { useAppSelector } from "../../app-store/storeHooks"
import { loadOrders } from "../../utils/localStorage"
import OrderCard from '../../components/orders/OrderCard'
import { Link } from "react-router-dom"
import SEO from '../../components/seo/SEO'
import './orders.scss'

function Orders() {

    const user = useAppSelector(state => state.auth.user)
    if (!user) return null;
    const orders = [...loadOrders()[user.id] ?? []].reverse();

    return (
        orders.length === 0 ?
            (
                <div className="empty-orders">
                    <SEO
                        title="My Orders"
                        description="View all your previous orders."
                    />
                    <div className="empty-orders-icon">
                        📦
                    </div>
                    <h2>No Orders Yet</h2>
                    <p>
                        You haven't placed any orders yet.
                        Start shopping to see your orders here.
                    </p>
                    <Link
                        to="/products"
                        className="button"
                    >
                        Browse Products
                    </Link>
                </div>
            ) :
            (
                <section className="orders-section">
                    <SEO
                        title="My Orders"
                        description="View all your previous orders."
                    />
            
                    <div className="orders-container">

                        <div className="orders-header">
                            <h1>My Orders</h1>
                            <p>View and manage your previous orders.</p>
                        </div>
                        
                        <div className="orders-card-container">
                            {orders.map(order => 
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                />
                            )}

                        </div>
                    </div>
                </section>
            )
    )
}

export default Orders
