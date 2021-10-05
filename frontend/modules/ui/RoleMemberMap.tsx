

export const RoleMemberMap = ({ role, roleObj }) => {
    console.log(role, roleObj);

    return (
        <div className="rolemap">
            { roleObj.username }
        </div>
    )
}