namespace BusTracker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class qwer1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BusModels", "BusModelId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BusModels", "BusModelId", c => c.Int(nullable: false, identity: true));
        }
    }
}
