import MenuItem from "./menu-item"
import MenuItemForm from "@/components/menu-item-form"
import styles from "./menu.module.scss"

export const Menu = ({ menuItems, location, locationAlert, addToOrder, itemDeleted }) => {

    return (
        <>
            <div>
                <div className={styles.row}>
                    <p className={styles.cell}>Name</p>
                    <p className={styles.cell}>Price</p>
                    <p className={styles.cell}>Description</p>
                    <p className={styles.cell}>Actions</p>
                </div>
                <MenuItemForm isFiltered={location ? true : false} location={location} locationAlert={locationAlert} menuItems={menuItems} />
                {menuItems && menuItems.map((menuItem) => (
                    <div key={menuItem.menuItemId}>
                        <MenuItem 
                            addItem={addToOrder}
                            description={menuItem.description} 
                            id={menuItem.menuItemId} 
                            isFiltered={location ? true : false}
                            location={menuItem.location}
                            locationAlert={locationAlert}
                            menuItems={menuItems}
                            name={menuItem.name}
                            price={menuItem.price}
                            onDelete={id => itemDeleted(id)}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Menu
