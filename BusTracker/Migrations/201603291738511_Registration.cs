namespace BusTracker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Registration : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Seats", "BusModelId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Seats", new[] { "BusModelId" });
        }
    }
}
