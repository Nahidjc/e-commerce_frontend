import "./FilterSidebar.css";

export default function FilterSideBar() {


    const brands = ['Apple', 'Samsung', 'Oppo'];
    const categories = ["top", "bottom", "footwear"];
    return (
        <div className="Sidebar">
            <div className="Filter-container">
                <span className="Filter-header">Categories</span>
                <ul className="Filter-list">

                    {categories.map((category) => (
                        <li>
                            <label className="Filter">
                                <input
                                    type="checkbox"
                                    className="Filter-checkbox"

                                />
                                {category}
                            </label>
                        </li>
                    ))}

                </ul>
            </div>
            <div className="Filter-container">
                <span className="Filter-header">Brands</span>
                <ul className="Filter-list">

                    {brands.map((brand) => (
                        <li>
                            <label className="Filter">
                                <input
                                    type="checkbox"
                                    className="Filter-checkbox"

                                />
                                {brand}
                            </label>
                        </li>
                    ))}

                </ul>
            </div>

        </div>
    );
}
